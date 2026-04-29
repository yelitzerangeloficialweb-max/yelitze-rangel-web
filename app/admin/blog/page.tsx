'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, FileText, Loader2, ExternalLink, Image as ImageIcon, Search, Layout, Tag, Calendar, User, MoreVertical, X, Check } from 'lucide-react';
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
    const [searchTerm, setSearchTerm] = useState('');
    
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

    const filteredPosts = posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center py-40">
                <Loader2 className="w-10 h-10 animate-spin text-[var(--color-primary)]" />
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-20 animate-fade-in">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-heading font-bold text-[var(--color-primary)] mb-2">
                        Escritos y Crónicas
                    </h1>
                    <p className="text-stone-500 font-medium italic">
                        Plataforma de narrativa editorial para conectar con tu audiencia.
                    </p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-[var(--color-primary)] text-white font-bold rounded-2xl hover:bg-[var(--color-primary-light)] transition-all shadow-lg shadow-primary/20 hover:-translate-y-0.5"
                >
                    <Plus className="w-5 h-5" />
                    Publicar Crónica
                </button>
            </div>

            {/* Content Stats & Search */}
            <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-[2.5rem] border border-stone-100 shadow-sm">
                <div className="relative flex-grow w-full">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-300 w-5 h-5" />
                    <input 
                        type="text"
                        placeholder="Buscar por título, categoría o concepto..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-14 pr-6 py-4 rounded-[1.5rem] border border-transparent bg-stone-50 focus:bg-white focus:border-[var(--color-primary)] transition-all outline-none text-stone-600 font-medium"
                    />
                </div>
                <div className="flex items-center gap-2 px-6 py-4 bg-stone-50 rounded-[1.5rem] border border-stone-100 min-w-[200px] justify-center">
                    <Layout className="w-4 h-4 text-stone-400" />
                    <span className="text-xs font-bold text-stone-500 uppercase tracking-widest">{posts.length} Artículos</span>
                </div>
            </div>

            {/* Articles List */}
            {filteredPosts.length === 0 ? (
                <div className="bg-white rounded-[3rem] py-40 text-center border border-stone-100 shadow-sm">
                    <div className="w-24 h-24 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-8">
                        <FileText className="w-10 h-10 text-stone-200" />
                    </div>
                    <h2 className="text-3xl font-heading text-stone-300 font-bold mb-4">No se encontraron artículos</h2>
                    <p className="text-stone-400 max-w-md mx-auto italic mb-8">
                        Tu biblioteca editorial está lista para recibir nuevas historias. Empieza a escribir hoy mismo.
                    </p>
                    <button onClick={() => setShowForm(true)} className="px-8 py-4 bg-stone-100 text-stone-600 font-bold rounded-2xl hover:bg-stone-200 transition-all text-xs uppercase tracking-[0.2em]">
                        Comenzar Escritura
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {filteredPosts.map(post => (
                        <div key={post.id} className="group bg-white rounded-[2rem] p-4 border border-stone-100 hover:border-[var(--color-primary)] transition-all hover:shadow-xl hover:shadow-primary/5">
                            <div className="flex flex-col md:flex-row items-center gap-6">
                                {/* Thumbnail */}
                                <div className="relative w-full md:w-48 h-48 md:h-32 rounded-[1.5rem] overflow-hidden bg-stone-100 flex-shrink-0">
                                    {post.image ? (
                                        <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-stone-300">
                                            <ImageIcon size={32} />
                                        </div>
                                    )}
                                    <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-widest shadow-sm">
                                        {post.category}
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="flex-grow space-y-2 text-center md:text-left">
                                    <h3 className="text-xl font-heading font-bold text-stone-900 line-clamp-1 group-hover:text-[var(--color-primary)] transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-stone-400 text-sm line-clamp-2 italic font-medium leading-relaxed max-w-2xl">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
                                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                                            <Calendar size={12} className="text-stone-300" />
                                            {post.date}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                                            <User size={12} className="text-stone-300" />
                                            {post.author}
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex md:flex-col gap-2 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-stone-100 pl-0 md:pl-6 w-full md:w-auto justify-center">
                                    <Link href={`/blog/${post.slug}`} target="_blank" className="p-3 text-stone-400 hover:text-[var(--color-primary)] hover:bg-stone-50 rounded-xl transition-all" title="Ver en Web">
                                        <ExternalLink size={18} />
                                    </Link>
                                    <button onClick={() => handleEdit(post)} className="p-3 text-stone-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all" title="Editar">
                                        <Pencil size={18} />
                                    </button>
                                    <button onClick={() => handleDelete(post.id)} className="p-3 text-stone-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all" title="Eliminar">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="relative w-full max-w-6xl bg-[#FAF9F6] rounded-[3rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">
                        {/* Header */}
                        <div className="p-8 border-b border-stone-200 bg-white flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 bg-[var(--color-primary)] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                                    <FileText size={28} />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-heading font-bold text-[var(--color-primary)]">
                                        {editingPost ? 'Refinar Narrativa' : 'Nueva Crónica'}
                                    </h2>
                                    <p className="text-stone-500 font-medium italic">Define la esencia visual y narrativa de tu próximo escrito.</p>
                                </div>
                            </div>
                            <button onClick={resetForm} className="p-4 text-stone-400 hover:text-stone-900 transition-colors">
                                <X size={32} />
                            </button>
                        </div>

                        {/* Body */}
                        <form onSubmit={handleSubmit} id="blog-form" className="flex-grow overflow-y-auto p-10">
                            <div className="grid lg:grid-cols-3 gap-10">
                                {/* Left: Metadata */}
                                <div className="lg:col-span-1 space-y-8">
                                    <div className="space-y-6 bg-white p-8 rounded-[2rem] border border-stone-200 shadow-sm">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest px-1">Título Editorial</label>
                                            <input 
                                                type="text" 
                                                required 
                                                value={formData.title}
                                                onChange={e => {
                                                    const title = e.target.value;
                                                    const slug = title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                                                    setFormData({ ...formData, title, slug: editingPost ? formData.slug : slug });
                                                }}
                                                className="w-full px-6 py-4 rounded-2xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-[var(--color-primary)] transition-all font-bold text-stone-900 outline-none"
                                                placeholder="Ej. El Despertar del Alma"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest px-1">Slug (Identificador URL)</label>
                                            <div className="flex items-center gap-2 px-4 py-3 bg-stone-100 rounded-xl border border-stone-200">
                                                <span className="text-stone-400 text-xs font-mono">/blog/</span>
                                                <input 
                                                    type="text" 
                                                    required 
                                                    value={formData.slug}
                                                    onChange={e => setFormData({ ...formData, slug: e.target.value })}
                                                    className="flex-grow bg-transparent text-xs font-mono font-bold text-[var(--color-primary)] outline-none"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest px-1">Categoría</label>
                                                <input 
                                                    type="text" 
                                                    required 
                                                    value={formData.category}
                                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 outline-none focus:border-[var(--color-primary)] text-sm font-bold"
                                                    placeholder="Bienestar"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest px-1">Fecha de Publicación</label>
                                                <input 
                                                    type="text" 
                                                    required 
                                                    value={formData.date}
                                                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 outline-none focus:border-[var(--color-primary)] text-sm font-bold"
                                                    placeholder="20 Abr, 2026"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6 bg-white p-8 rounded-[2rem] border border-stone-200 shadow-sm">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest px-1">Imagen de Portada (URL)</label>
                                            <input 
                                                type="text" 
                                                required 
                                                value={formData.image}
                                                onChange={e => setFormData({ ...formData, image: e.target.value })}
                                                className="w-full px-6 py-4 rounded-2xl border border-stone-200 bg-stone-50 outline-none focus:border-[var(--color-primary)] text-xs font-mono"
                                                placeholder="/images/blog/portada.jpg"
                                            />
                                        </div>
                                        <div className="relative w-full h-40 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 flex items-center justify-center">
                                            {formData.image ? (
                                                <Image src={formData.image} alt="Preview" fill className="object-cover" unoptimized />
                                            ) : (
                                                <ImageIcon size={32} className="text-stone-300" />
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Content */}
                                <div className="lg:col-span-2 space-y-8">
                                    <div className="space-y-6 bg-white p-8 rounded-[2rem] border border-stone-200 shadow-sm h-full flex flex-col">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest px-1">Resumen Cautivador (Excerpt)</label>
                                            <textarea 
                                                rows={2}
                                                required
                                                value={formData.excerpt}
                                                onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                                                className="w-full px-6 py-4 rounded-2xl border border-stone-200 bg-stone-50 focus:bg-white outline-none focus:border-[var(--color-primary)] italic font-medium text-stone-600"
                                                placeholder="Una breve introducción que invite a seguir leyendo..."
                                            />
                                        </div>
                                        <div className="space-y-1 flex-grow flex flex-col">
                                            <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest px-1">Cuerpo del Artículo (HTML Soportado)</label>
                                            <textarea 
                                                required
                                                value={formData.content}
                                                onChange={e => setFormData({ ...formData, content: e.target.value })}
                                                className="w-full flex-grow px-6 py-6 rounded-2xl border border-stone-200 bg-stone-50 focus:bg-white outline-none focus:border-[var(--color-primary)] font-mono text-sm leading-relaxed"
                                                placeholder="Escribe aquí tu historia..."
                                            />
                                        </div>
                                        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 text-[10px] text-amber-700 font-bold uppercase tracking-widest flex items-center gap-2">
                                            <Layout size={14} /> Puedes usar etiquetas HTML para dar formato premium a tus textos.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>

                        {/* Footer */}
                        <div className="p-8 border-t border-stone-200 bg-white flex gap-6">
                            <button onClick={resetForm} className="px-10 py-5 bg-white text-stone-500 font-bold rounded-2xl border border-stone-200 hover:bg-stone-50 transition-all text-xs uppercase tracking-widest">
                                Descartar
                            </button>
                            <button 
                                onClick={handleSubmit}
                                disabled={saving}
                                className="flex-1 py-5 bg-[var(--color-primary)] text-white font-bold rounded-2xl shadow-2xl shadow-primary/30 hover:bg-[var(--color-primary-light)] transition-all flex items-center justify-center gap-3 text-xs uppercase tracking-[0.3em]"
                            >
                                {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Check size={18} />}
                                {editingPost ? 'Sincronizar Cambios' : 'Publicar Crónica'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
