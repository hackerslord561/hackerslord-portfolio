"use client";

import { useState, useEffect } from "react";
import { db, storage } from "@/lib/firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Plus, Edit2, Trash2, Image as ImageIcon, Star, X, Loader2, Images } from "lucide-react";
import Image from "next/image";

type Category = "Photography" | "Websites" | "Video Edits" | "Cinematography";

interface Project {
    id: string;
    title: string;
    category: Category;
    imageSrc: string; // The Cover Image
    gallery?: string[]; // The Additional Images
    link: string;
    isFeatured: boolean;
}

export function ProjectsManager() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);

    // Form State
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        category: "Websites" as Category,
        imageSrc: "",
        gallery: [] as string[],
        link: "",
        isFeatured: false,
    });

    // File States
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [galleryFiles, setGalleryFiles] = useState<File[]>([]);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, "projects"));
            const projectsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Project[];
            setProjects(projectsData);
        } catch (error) {
            console.error("Error fetching projects:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.category) return;
        setUploadingImage(true);

        try {
            let finalCoverUrl = formData.imageSrc;
            let finalGalleryUrls = [...(formData.gallery || [])];

            // 1. Upload Cover Image if new file selected
            if (imageFile && !formData.imageSrc.includes(imageFile.name)) {
                const coverRef = ref(storage, `portfolio/covers/${Date.now()}_${imageFile.name}`);
                const coverSnap = await uploadBytes(coverRef, imageFile);
                finalCoverUrl = await getDownloadURL(coverSnap.ref);
            }

            // 2. Upload Multiple Gallery Images if selected (For Photo/Cinema)
            if (galleryFiles.length > 0) {
                const uploadPromises = galleryFiles.map(async (file) => {
                    const galleryRef = ref(storage, `portfolio/gallery/${Date.now()}_${file.name}`);
                    const snap = await uploadBytes(galleryRef, file);
                    return await getDownloadURL(snap.ref);
                });
                const newUrls = await Promise.all(uploadPromises);
                finalGalleryUrls = [...finalGalleryUrls, ...newUrls];
            }

            const projectData = {
                title: formData.title,
                category: formData.category,
                imageSrc: finalCoverUrl,
                gallery: finalGalleryUrls,
                link: formData.link,
                isFeatured: formData.isFeatured,
                updatedAt: new Date().toISOString()
            };

            // 3. Save to Firestore Database
            if (editingId) {
                await updateDoc(doc(db, "projects", editingId), projectData);
            } else {
                await addDoc(collection(db, "projects"), {
                    ...projectData,
                    createdAt: new Date().toISOString()
                });
            }

            closeModal();
            fetchProjects();
        } catch (error) {
            console.error("Error saving project:", error);
            alert("Failed to save project.");
        } finally {
            setUploadingImage(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this project? This cannot be undone.")) return;
        try {
            await deleteDoc(doc(db, "projects", id));
            fetchProjects();
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };

    const removeGalleryImage = (indexToRemove: number) => {
        setFormData(prev => ({
            ...prev,
            gallery: prev.gallery.filter((_, idx) => idx !== indexToRemove)
        }));
    };

    const openModal = (project?: Project) => {
        if (project) {
            setEditingId(project.id);
            setFormData({
                title: project.title,
                category: project.category,
                imageSrc: project.imageSrc || "",
                gallery: project.gallery || [],
                link: project.link || "",
                isFeatured: project.isFeatured || false,
            });
        } else {
            setEditingId(null);
            setFormData({ title: "", category: "Websites", imageSrc: "", gallery: [], link: "", isFeatured: false });
        }
        setImageFile(null);
        setGalleryFiles([]);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingId(null);
        setImageFile(null);
        setGalleryFiles([]);
    };

    return (
        <div className="flex flex-col gap-8 w-full">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-bold">Database: Projects</h2>
                    <p className="text-sm text-foreground/50 font-sans">Manage your portfolio items, cover images, and galleries.</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="bg-foreground text-background px-4 py-2 rounded-lg font-sans text-sm font-medium flex items-center gap-2 hover:bg-foreground/90 transition-colors clickable"
                >
                    <Plus className="w-4 h-4" />
                    New Project
                </button>
            </div>

            {loading ? (
                <div className="w-full h-64 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-foreground/30" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <div key={project.id} className="glass-panel rounded-xl overflow-hidden flex flex-col border border-border/50 group">
                            <div className="relative aspect-video w-full bg-foreground/5">
                                {project.imageSrc ? (
                                    <Image src={project.imageSrc} alt={project.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-foreground/20">
                                        <ImageIcon className="w-8 h-8" />
                                    </div>
                                )}

                                {project.isFeatured && (
                                    <div className="absolute top-3 left-3 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded shadow flex items-center gap-1">
                                        <Star className="w-3 h-3 fill-black" /> Featured
                                    </div>
                                )}

                                {/* Badge showing if this project has a gallery */}
                                {project.gallery && project.gallery.length > 0 && (
                                    <div className="absolute bottom-3 left-3 bg-background/80 backdrop-blur text-foreground text-xs font-bold px-2 py-1 rounded shadow flex items-center gap-1">
                                        <Images className="w-3 h-3" /> {project.gallery.length} Images
                                    </div>
                                )}

                                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => openModal(project)} className="p-2 bg-background/80 backdrop-blur rounded shadow hover:text-blue-500 transition-colors clickable">
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => handleDelete(project.id)} className="p-2 bg-background/80 backdrop-blur rounded shadow hover:text-red-500 transition-colors clickable">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="p-4 flex flex-col gap-1">
                                <span className="text-xs uppercase tracking-widest text-foreground/50 font-sans font-medium">{project.category}</span>
                                <h3 className="font-[family-name:var(--font-playfair)] font-medium text-lg leading-tight">{project.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm cursor-none">
                    <div className="w-full max-w-2xl bg-background border border-border/50 rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
                        <div className="flex justify-between items-center p-6 border-b border-border/50">
                            <h3 className="font-[family-name:var(--font-playfair)] font-bold text-xl">
                                {editingId ? "Edit Project" : "Add New Project"}
                            </h3>
                            <button onClick={closeModal} className="text-foreground/50 hover:text-foreground clickable"><X className="w-5 h-5" /></button>
                        </div>

                        <div className="overflow-y-auto p-6 custom-scrollbar">
                            <form id="project-form" onSubmit={handleSubmit} className="flex flex-col gap-6">

                                <div className="flex flex-col gap-2">
                                    <label className="text-xs tracking-widest uppercase text-foreground/70 font-sans">Project Title</label>
                                    <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required className="w-full bg-foreground/5 border border-border/50 rounded-lg px-4 py-2 font-sans outline-none focus:border-green-500 clickable" placeholder="e.g. Lauderium Shots" />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-xs tracking-widest uppercase text-foreground/70 font-sans">Category</label>
                                    <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value as Category})} className="w-full bg-foreground/5 border border-border/50 rounded-lg px-4 py-2 font-sans outline-none focus:border-green-500 clickable">
                                        <option value="Websites">Websites</option>
                                        <option value="Photography">Photography</option>
                                        <option value="Video Edits">Video Edits</option>
                                        <option value="Cinematography">Cinematography</option>
                                    </select>
                                </div>

                                {/* Primary Cover Image Upload */}
                                <div className="flex flex-col gap-2 p-4 bg-foreground/5 rounded-lg border border-border/50">
                                    <label className="text-xs tracking-widest uppercase text-foreground/70 font-sans font-bold flex items-center gap-2">
                                        <ImageIcon className="w-4 h-4"/> Primary Cover Image
                                    </label>
                                    <div className="flex flex-col gap-3">
                                        {formData.imageSrc && (
                                            <div className="relative w-full md:w-1/2 aspect-video rounded-lg overflow-hidden border border-border/50">
                                                <Image src={formData.imageSrc} alt="Cover Preview" fill className="object-cover" />
                                            </div>
                                        )}
                                        <input type="file" accept="image/*" onChange={(e) => {
                                            if (e.target.files?.[0]) {
                                                setImageFile(e.target.files[0]);
                                                setFormData({...formData, imageSrc: URL.createObjectURL(e.target.files[0])});
                                            }
                                        }} className="text-sm font-sans file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-foreground/10 file:text-foreground hover:file:bg-foreground/20 transition-colors clickable" />
                                    </div>
                                </div>

                                {/* Conditional Multiple Gallery Upload (Only shows for Photography & Cinematography) */}
                                {(formData.category === "Photography" || formData.category === "Cinematography") && (
                                    <div className="flex flex-col gap-2 p-4 bg-blue-500/5 rounded-lg border border-blue-500/20">
                                        <label className="text-xs tracking-widest uppercase text-foreground/70 font-sans font-bold flex items-center gap-2">
                                            <Images className="w-4 h-4"/> Additional Gallery Images
                                        </label>
                                        <p className="text-xs text-foreground/50 font-sans mb-2">Upload multiple images to showcase this gig in the project viewer.</p>

                                        {/* Preview Existing Database Gallery Images */}
                                        {formData.gallery && formData.gallery.length > 0 && (
                                            <div className="flex flex-wrap gap-3 mb-2">
                                                {formData.gallery.map((url, idx) => (
                                                    <div key={idx} className="relative w-20 h-20 rounded-lg overflow-hidden border border-border/50 group">
                                                        <Image src={url} alt={`Gallery ${idx}`} fill className="object-cover" />
                                                        <button
                                                            type="button"
                                                            onClick={() => removeGalleryImage(idx)}
                                                            className="absolute inset-0 bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity clickable"
                                                        >
                                                            <Trash2 className="w-5 h-5"/>
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={(e) => {
                                                if (e.target.files) setGalleryFiles(Array.from(e.target.files));
                                            }}
                                            className="text-sm font-sans file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500/20 file:text-blue-500 hover:file:bg-blue-500/30 transition-colors clickable"
                                        />
                                        {galleryFiles.length > 0 && (
                                            <span className="text-xs text-green-500 mt-1">{galleryFiles.length} new files ready to upload.</span>
                                        )}
                                    </div>
                                )}

                                <div className="flex flex-col gap-2">
                                    <label className="text-xs tracking-widest uppercase text-foreground/70 font-sans">Project Link (Optional)</label>
                                    <input type="url" value={formData.link} onChange={(e) => setFormData({...formData, link: e.target.value})} className="w-full bg-foreground/5 border border-border/50 rounded-lg px-4 py-2 font-sans outline-none focus:border-green-500 clickable" placeholder="https://" />
                                </div>

                                <div className="flex items-center gap-3 p-4 bg-foreground/5 rounded-lg border border-border/50">
                                    <input type="checkbox" id="featured" checked={formData.isFeatured} onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})} className="w-5 h-5 rounded border-gray-300 text-green-500 focus:ring-green-500 clickable" />
                                    <div className="flex flex-col">
                                        <label htmlFor="featured" className="text-sm font-medium font-sans cursor-pointer clickable">Feature on Desktop</label>
                                        <p className="text-xs text-foreground/50 font-sans">This project will appear in the massive scrolling grid on your homepage.</p>
                                    </div>
                                </div>

                            </form>
                        </div>

                        <div className="p-6 border-t border-border/50 flex justify-end gap-3 bg-background">
                            <button onClick={closeModal} type="button" className="px-5 py-2 rounded-lg font-sans text-sm font-medium hover:bg-foreground/5 transition-colors clickable">Cancel</button>
                            <button form="project-form" type="submit" disabled={uploadingImage} className="bg-green-500 text-white px-5 py-2 rounded-lg font-sans text-sm font-medium hover:bg-green-600 transition-colors flex items-center gap-2 disabled:opacity-50 clickable">
                                {uploadingImage ? <><Loader2 className="w-4 h-4 animate-spin" /> Uploading...</> : "Save Project"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}