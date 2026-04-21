'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, FileText, Loader2, ExternalLink, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    image: string;
    category: string;
    author: string;
    updatedAt: string;
}

export default function AdminBlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
    const [saving, setSaving] = useState(false);
    
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        date: '',
        image: '',
        category: '',
        author: 'Yelitze Rangel'
    });

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await fetch('/api/admin/blog');
            const data = await res.json();
            if (Array.isArray(data)) {
                setPosts(data);
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const url = editingPost
                ? `/api/admin/blog/${editingPost.id}`
                : '/api/admin/blog';
            const method = editingPost ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                await fetchPosts();
                resetForm();
            }
        } catch (error) {
            console.error('Error saving post:', error);
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (post: BlogPost) => {
        setEditingPost(post);
        setFormData({
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            content: post.content,
            date: post.date,
            image: post.image,
            category: post.category,
            author: post.author
        });
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás segura de eliminar este artículo? Esta acción no se puede deshacer.')) return;

        try {
            const res = await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' });
            if (res.ok) {
                await fetchPosts();
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const resetForm = () => {
        setShowForm(false);
        setEditingPost(null);
        setFormData({
            title: '',
            slug: '',
            excerpt: '',
            content: '',
            date: '',
            image: '',
            category: '',
            author: 'Yelitze Rangel'
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--color-secondary)]" />
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-20">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-heading text-[var(--color-primary)] font-bold">
                        Gestión del Blog
                    </h1>
                    <p className="text-stone-500">{posts.length} artículos publicados en total</p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-[var(--color-primary)] text-white font-bold rounded-xl hover:bg-[var(--color-primary-light)] transition-colors shadow-lg"
                >
                    <Plus className="w-5 h-5" />
                    Nuevo Artículo
                </button>
            </div>

            {/* Articles Table */}
            {posts.length === 0 ? (
                <div className="bg-white rounded-3xl p-16 text-center shadow-sm">
                    <FileText className="w-16 h-16 text-stone-200 mx-auto mb-4" />
                    <h2 className="text-xl font-heading text-[var(--color-primary)] mb-2">No hay artículos</h2>
                    <p className="text-stone-500 mb-6">Empieza a escribir tu primera crónica del alma</p>
                    <button
                        onClick={() => setShowForm(true)}
                        className="px-6 py-3 bg-[var(--color-primary)] text-white font-bold rounded-xl hover:bg-[var(--color-primary-light)] transition-colors"
                    >
                        Crear Artículo
                    </button>
                </div>
            ) : (
                <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-100">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-stone-50 border-b border-stone-100 text-left">
                                <tr>
                                    <th className="px-6 py-4 text-sm font-medium text-stone-500 font-bold uppercase tracking-wider">Artículo</th>
                                    <th className="px-6 py-4 text-sm font-medium text-stone-500 font-bold uppercase tracking-wider">Categoría</th>
                                    <th className="px-6 py-4 text-sm font-medium text-stone-500 font-bold uppercase tracking-wider">Fecha</th>
                                    <th className="px-6 py-4 text-sm font-medium text-stone-500 font-bold uppercase tracking-wider text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-100">
                                {posts.map(post => (
                                    <tr key={post.id} className="hover:bg-stone-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0 border border-stone-200 shadow-sm">
                                                    {post.image && (
                                                        <Image
                                                            src={post.image}
                                                            alt={post.title}
                                                            fill
                                                            className="object-cover"
                                                            unoptimized
                                                        />
                                                    )}
                                                </div>
                                                <div className="max-w-md">
                                                    <p className="font-bold text-[var(--color-primary)] line-clamp-1">{post.title}</p>
                                                    <p className="text-xs text-stone-400 font-mono">/{post.slug}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 rounded-full bg-stone-100 text-[10px] font-bold uppercase tracking-widest text-stone-600">
                                                {post.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-stone-500">
                                                {post.date}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link 
                                                    href={`/blog/${post.slug}`} 
                                                    target="_blank"
                                                    className="p-2 text-stone-400 hover:text-[var(--color-secondary)] hover:bg-stone-100 rounded-lg transition-colors"
                                                    title="Ver en el sitio"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleEdit(post)}
                                                    className="p-2 text-stone-400 hover:text-[var(--color-secondary)] hover:bg-stone-100 rounded-lg transition-colors"
                                                    title="Editar"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(post.id)}
                                                    className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Eliminar"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
                    <div className="bg-[#FAF9F6] rounded-[2.5rem] max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-white/20">
                        {/* Modal Header */}
                        <div className="p-8 border-b border-stone-200 bg-white flex items-center justify-between">
                            <div>
                                <h2 className="text-3xl font-heading text-[var(--color-primary)] font-bold">
                                    {editingPost ? 'Refinar Crónica' : 'Nueva Crónica del Alma'}
                                </h2>
                                <p className="text-stone-500 text-sm">Define la narrativa y la esencia visual de tu contenido.</p>
                            </div>
                            <button onClick={resetForm} className="text-stone-400 hover:text-stone-600">
                                <Plus className="w-8 h-8 rotate-45" />
                            </button>
                        </div>
                        
                        {/* Modal Body */}
                        <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-8 space-y-8">
                            <div className="grid lg:grid-cols-2 gap-8">
                                {/* Left Side: Basics */}
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-xs font-bold text-stone-700 uppercase tracking-widest mb-2">Título del Artículo</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.title}
                                            onChange={e => {
                                                const title = e.target.value;
                                                const slug = title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                                                setFormData({ ...formData, title, slug: editingPost ? formData.slug : slug });
                                            }}
                                            className="w-full px-6 py-4 rounded-2xl border border-stone-200 focus:outline-none focus:border-[var(--color-secondary)] bg-white text-lg font-heading"
                                            placeholder="Título inspirador..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-stone-700 uppercase tracking-widest mb-2">Slug (URL)</label>
                                        <div className="flex items-center gap-2">
                                            <span className="text-stone-400 text-sm">/blog/</span>
                                            <input
                                                type="text"
                                                required
                                                value={formData.slug}
                                                onChange={e => setFormData({ ...formData, slug: e.target.value })}
                                                className="flex-grow px-4 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-[var(--color-secondary)] bg-white text-sm font-mono"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-stone-700 uppercase tracking-widest mb-2">Categoría</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.category}
                                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[var(--color-secondary)] bg-white"
                                                placeholder="Ej. Bienestar, Ritual..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-stone-700 uppercase tracking-widest mb-2">Fecha Display</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.date}
                                                onChange={e => setFormData({ ...formData, date: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[var(--color-secondary)] bg-white"
                                                placeholder="Ej. 19 de Abril, 2026"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-stone-700 uppercase tracking-widest mb-2">Resumen (Excerpt)</label>
                                        <textarea
                                            required
                                            rows={3}
                                            value={formData.excerpt}
                                            onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[var(--color-secondary)] bg-white italic"
                                            placeholder="Breve introducción que atrapa al lector..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-stone-700 uppercase tracking-widest mb-2">Ruta de Imagen (4K)</label>
                                        <div className="flex gap-2 mb-2">
                                            <input
                                                type="text"
                                                required
                                                value={formData.image}
                                                onChange={e => setFormData({ ...formData, image: e.target.value })}
                                                className="flex-grow px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[var(--color-secondary)] bg-white font-mono text-sm"
                                                placeholder="/images/blog_portraits/nombre-imagen.jpg"
                                            />
                                        </div>
                                        <div className="p-4 bg-stone-100 rounded-2xl flex items-center gap-4">
                                            <div className="w-20 h-20 relative rounded-xl overflow-hidden bg-stone-200 border border-stone-300">
                                                {formData.image && (
                                                    <Image src={formData.image} alt="Preview" fill className="object-cover" unoptimized />
                                                )}
                                                {!formData.image && <ImageIcon className="w-8 h-8 text-stone-400 absolute inset-0 m-auto" />}
                                            </div>
                                            <div className="text-[10px] text-stone-500 uppercase tracking-widest">
                                                <p className="font-bold text-stone-700 mb-1">Vista Previa de Portada</p>
                                                <p>Usa imágenes optimizadas en 4K para mantener el estándar premium.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side: Content Area */}
                                <div className="flex flex-col h-full space-y-4">
                                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-widest">Contenido del Artículo (HTML)</label>
                                    <div className="flex-grow min-h-[400px] flex flex-col">
                                        <textarea
                                            required
                                            value={formData.content}
                                            onChange={e => setFormData({ ...formData, content: e.target.value })}
                                            className="w-full flex-grow p-6 rounded-2xl border border-stone-200 focus:outline-none focus:border-[var(--color-secondary)] bg-white font-mono text-sm leading-relaxed"
                                            placeholder="Introduce el cuerpo del artículo con etiquetas HTML para dar formato..."
                                        />
                                    </div>
                                    <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 italic text-[10px] text-amber-700">
                                        🌟 Tip: Puedes usar <code className="bg-amber-100 px-1 rounded">&lt;h3&gt;</code> para subtítulos y 
                                        <code className="bg-amber-100 px-1 rounded">class="text-[var(--color-primary)] font-heading"</code> para estilo premium.
                                    </div>
                                </div>
                            </div>
                        </form>

                        {/* Modal Footer */}
                        <div className="p-8 border-t border-stone-200 bg-white flex gap-4">
                            <button
                                type="button"
                                onClick={resetForm}
                                className="px-8 py-4 border-2 border-stone-200 text-stone-600 font-bold rounded-2xl hover:bg-stone-50 transition-colors uppercase tracking-widest text-xs"
                            >
                                Descartar Cambios
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={saving}
                                className="flex-1 py-4 bg-[var(--color-primary)] text-white font-bold rounded-2xl hover:bg-[var(--color-secondary)] transition-all disabled:opacity-50 flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-xs shadow-xl"
                            >
                                {saving && <Loader2 className="w-5 h-5 animate-spin" />}
                                {editingPost ? 'Sincronizar Crónica' : 'Publicar Crónica'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
