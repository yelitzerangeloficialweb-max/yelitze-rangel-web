'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Package, Loader2, Search, Filter, MoreVertical, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface Product {
    id: string;
    name: string;
    subtitle?: string;
    description: string;
    price: number;
    image: string;
    images?: string;
    category: string;
    stock: number;
    featured: boolean;
    active: boolean;
}

const CATEGORY_LABELS: Record<string, string> = {
    libro: 'Libro',
    oraculo: 'Oráculo',
    accesorio: 'Accesorio'
};

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [formData, setFormData] = useState({
        name: '',
        subtitle: '',
        description: '',
        price: '',
        image: '',
        images: ['', '', '', ''],
        category: 'libro',
        stock: '10',
        featured: false,
        active: true
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/admin/products');
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const url = editingProduct
                ? `/api/admin/products/${editingProduct.id}`
                : '/api/admin/products';
            const method = editingProduct ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                await fetchProducts();
                resetForm();
            }
        } catch (error) {
            console.error('Error saving product:', error);
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        
        let parsedImages = ['', '', '', ''];
        try {
            if (product.images) {
                const arr = JSON.parse(product.images);
                if (Array.isArray(arr)) {
                    parsedImages = [...arr, '', '', '', ''].slice(0, 4);
                }
            }
        } catch (e) {}

        setFormData({
            name: product.name,
            subtitle: product.subtitle || '',
            description: product.description,
            price: product.price.toString(),
            image: product.image,
            images: parsedImages,
            category: product.category,
            stock: product.stock.toString(),
            featured: product.featured,
            active: product.active
        });
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás segura de eliminar este producto? Esta acción no se puede deshacer.')) return;

        try {
            await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
            await fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const resetForm = () => {
        setShowForm(false);
        setEditingProduct(null);
        setFormData({
            name: '',
            subtitle: '',
            description: '',
            price: '',
            image: '',
            images: ['', '', '', ''],
            category: 'libro',
            stock: '10',
            featured: false,
            active: true
        });
    };

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             p.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center py-40">
                <Loader2 className="w-10 h-10 animate-spin text-[var(--color-primary)]" />
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-20">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-heading font-bold text-[var(--color-primary)] mb-2">
                        Inventario de Productos
                    </h1>
                    <p className="text-stone-500 font-medium">
                        Gestiona tus libros, oráculos y accesorios exclusivos.
                    </p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-[var(--color-primary)] text-white font-bold rounded-2xl hover:bg-[var(--color-primary-light)] transition-all shadow-lg shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0"
                >
                    <Plus className="w-5 h-5" />
                    Añadir Producto
                </button>
            </div>

            {/* Filters Bar */}
            <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-[2rem] border border-stone-100 shadow-sm">
                <div className="relative flex-grow">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300 w-5 h-5" />
                    <input 
                        type="text"
                        placeholder="Buscar por nombre o descripción..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-transparent bg-stone-50 focus:bg-white focus:border-[var(--color-primary)] focus:ring-4 focus:ring-primary/5 transition-all outline-none text-stone-600"
                    />
                </div>
                <div className="flex gap-4">
                    <div className="relative">
                        <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300 w-4 h-4" />
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="pl-10 pr-8 py-3 rounded-xl border border-transparent bg-stone-50 focus:bg-white focus:border-[var(--color-primary)] transition-all outline-none text-stone-600 font-medium appearance-none cursor-pointer"
                        >
                            <option value="all">Todas las Categorías</option>
                            <option value="libro">Libros</option>
                            <option value="oraculo">Oráculos</option>
                            <option value="accesorio">Accesorios</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Products Content */}
            {filteredProducts.length === 0 ? (
                <div className="bg-white rounded-[3rem] py-32 text-center border border-stone-100 shadow-sm">
                    <div className="w-24 h-24 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Package className="w-10 h-10 text-stone-200" />
                    </div>
                    <h2 className="text-2xl font-heading text-stone-400 mb-2 font-bold">No se encontraron productos</h2>
                    <p className="text-stone-400 mb-8 max-w-sm mx-auto">Prueba ajustando tus filtros o empieza creando un nuevo producto para tu catálogo.</p>
                    <button
                        onClick={() => setShowForm(true)}
                        className="px-8 py-3 bg-stone-100 text-stone-600 font-bold rounded-xl hover:bg-stone-200 transition-colors"
                    >
                        Crear Primer Producto
                    </button>
                </div>
            ) : (
                <div className="bg-white rounded-[2.5rem] overflow-hidden border border-stone-100 shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-stone-100 bg-stone-50/50">
                                    <th className="px-8 py-5 text-xs font-bold text-stone-400 uppercase tracking-[0.2em]">Producto</th>
                                    <th className="px-8 py-5 text-xs font-bold text-stone-400 uppercase tracking-[0.2em]">Categoría</th>
                                    <th className="px-8 py-5 text-xs font-bold text-stone-400 uppercase tracking-[0.2em]">Precio</th>
                                    <th className="px-8 py-5 text-xs font-bold text-stone-400 uppercase tracking-[0.2em]">Stock</th>
                                    <th className="px-8 py-5 text-xs font-bold text-stone-400 uppercase tracking-[0.2em]">Estado</th>
                                    <th className="px-8 py-5 text-xs font-bold text-stone-400 uppercase tracking-[0.2em] text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-50">
                                {filteredProducts.map(product => (
                                    <tr key={product.id} className="group hover:bg-[#F9F8F6] transition-colors">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-5">
                                                <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-stone-100 flex-shrink-0 border border-stone-100 shadow-sm group-hover:shadow-md transition-shadow">
                                                    {product.image ? (
                                                        <Image
                                                            src={product.image}
                                                            alt={product.name}
                                                            fill
                                                            className="object-cover"
                                                            unoptimized
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-stone-300">
                                                            <Package size={24} />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-stone-900 leading-tight mb-1 group-hover:text-[var(--color-primary)] transition-colors">{product.name}</p>
                                                    <p className="text-xs text-stone-400 font-medium italic line-clamp-1 max-w-[200px]">
                                                        {product.subtitle || 'Sin subtítulo'}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="px-4 py-1.5 rounded-full bg-stone-100 text-[10px] font-bold text-stone-600 uppercase tracking-widest border border-stone-200/50">
                                                {CATEGORY_LABELS[product.category] || product.category}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 font-heading font-bold text-stone-900 text-lg">
                                            ${product.price.toFixed(2)}
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2">
                                                <span className={`w-2 h-2 rounded-full ${product.stock > 5 ? 'bg-green-400' : product.stock > 0 ? 'bg-orange-400' : 'bg-red-400'}`} />
                                                <span className="text-stone-600 font-bold">{product.stock}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                                                product.active 
                                                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                                                    : 'bg-stone-50 text-stone-400 border border-stone-100'
                                            }`}>
                                                {product.active ? 'Visible' : 'Oculto'}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleEdit(product)}
                                                    className="p-2.5 text-stone-400 hover:text-[var(--color-primary)] hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-stone-100"
                                                    title="Editar"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="p-2.5 text-stone-400 hover:text-red-500 hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-red-50"
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

            {/* Product Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60] flex items-center justify-center p-4">
                    <div className="bg-[#FAF9F6] rounded-[2.5rem] max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-white/20">
                        <div className="p-8 border-b border-stone-200 bg-white flex items-center justify-between">
                            <div>
                                <h2 className="text-3xl font-heading text-[var(--color-primary)] font-bold">
                                    {editingProduct ? 'Refinar Producto' : 'Nueva Creación'}
                                </h2>
                                <p className="text-stone-500 text-sm mt-1">Define la esencia y detalles técnicos de tu producto.</p>
                            </div>
                            <button 
                                onClick={resetForm}
                                className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 hover:bg-stone-200 hover:text-stone-600 transition-colors"
                            >
                                <Plus className="w-6 h-6 rotate-45" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-8 space-y-8">
                            {/* Basic Info */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest px-1">Nombre del Producto</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-6 py-4 rounded-2xl border border-stone-200 bg-white focus:ring-4 focus:ring-primary/5 focus:border-[var(--color-primary)] outline-none transition-all font-heading text-lg"
                                        placeholder="Ej. Oráculo de las Almas"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest px-1">Subtítulo Descriptivo</label>
                                    <input
                                        type="text"
                                        value={formData.subtitle}
                                        onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
                                        className="w-full px-6 py-4 rounded-2xl border border-stone-200 bg-white focus:ring-4 focus:ring-primary/5 focus:border-[var(--color-primary)] outline-none transition-all"
                                        placeholder="Ej. Conexión profunda y sanación"
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest px-1">Narrativa del Producto</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-6 py-4 rounded-2xl border border-stone-200 bg-white focus:ring-4 focus:ring-primary/5 focus:border-[var(--color-primary)] outline-none transition-all resize-none leading-relaxed"
                                    placeholder="Describe la magia detrás de este producto..."
                                />
                            </div>

                            {/* Metrics & Category */}
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest px-1">Precio (USD)</label>
                                    <div className="relative">
                                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-400 font-bold">$</span>
                                        <input
                                            type="number"
                                            step="0.01"
                                            required
                                            value={formData.price}
                                            onChange={e => setFormData({ ...formData, price: e.target.value })}
                                            className="w-full pl-10 pr-6 py-4 rounded-2xl border border-stone-200 bg-white focus:border-[var(--color-primary)] outline-none font-bold"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest px-1">Categoría</label>
                                    <select
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-6 py-4 rounded-2xl border border-stone-200 bg-white focus:border-[var(--color-primary)] outline-none appearance-none cursor-pointer font-medium"
                                    >
                                        <option value="libro">Libro</option>
                                        <option value="oraculo">Oráculo</option>
                                        <option value="accesorio">Accesorio</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest px-1">Stock Disponible</label>
                                    <input
                                        type="number"
                                        value={formData.stock}
                                        onChange={e => setFormData({ ...formData, stock: e.target.value })}
                                        className="w-full px-6 py-4 rounded-2xl border border-stone-200 bg-white focus:border-[var(--color-primary)] outline-none"
                                    />
                                </div>
                            </div>

                            {/* Image */}
                            <div className="space-y-6 bg-stone-50 p-6 rounded-2xl border border-stone-100">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest px-1">Visual Principal (URL) *</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="/assets/images/shop/nombre-producto.jpg"
                                        value={formData.image}
                                        onChange={e => setFormData({ ...formData, image: e.target.value })}
                                        className="w-full px-6 py-4 rounded-2xl border border-stone-200 bg-white focus:border-[var(--color-primary)] outline-none font-mono text-xs"
                                    />
                                    {formData.image && (
                                        <div className="mt-4 p-4 bg-white rounded-2xl border border-stone-100 flex items-center gap-4">
                                            <div className="w-20 h-20 relative rounded-xl overflow-hidden border border-stone-100">
                                                <Image src={formData.image} alt="Preview" fill className="object-cover" unoptimized />
                                            </div>
                                            <div className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">
                                                Vista Previa Principal
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-4 pt-4 border-t border-stone-200">
                                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest px-1">Imágenes Adicionales (Opcional, hasta 4)</label>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {[0, 1, 2, 3].map((index) => (
                                            <div key={index} className="space-y-2">
                                                <input
                                                    type="text"
                                                    placeholder={`Imagen adicional ${index + 1} (URL)`}
                                                    value={formData.images[index] || ''}
                                                    onChange={e => {
                                                        const newImages = [...formData.images];
                                                        newImages[index] = e.target.value;
                                                        setFormData({ ...formData, images: newImages });
                                                    }}
                                                    className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white focus:border-[var(--color-primary)] outline-none font-mono text-xs"
                                                />
                                                {formData.images[index] && (
                                                    <div className="mt-2 p-2 bg-white rounded-xl border border-stone-100 flex items-center gap-3">
                                                        <div className="w-12 h-12 relative rounded-lg overflow-hidden border border-stone-100 bg-stone-50">
                                                            <Image src={formData.images[index]} alt="Preview" fill className="object-cover" unoptimized />
                                                        </div>
                                                        <div className="text-[9px] text-stone-400 uppercase tracking-widest font-bold">
                                                            Previa {index + 1}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Toggles */}
                            <div className="flex flex-col md:flex-row gap-8 p-6 bg-white rounded-3xl border border-stone-100">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${formData.featured ? 'bg-[var(--color-primary)] border-transparent' : 'border-stone-200 group-hover:border-stone-400'}`}>
                                        {formData.featured && <Plus className="w-4 h-4 text-white" />}
                                    </div>
                                    <input
                                        type="checkbox"
                                        hidden
                                        checked={formData.featured}
                                        onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                                    />
                                    <span className="text-sm font-bold text-stone-600 uppercase tracking-widest">Destacar en Inicio</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${formData.active ? 'bg-emerald-500 border-transparent' : 'border-stone-200 group-hover:border-stone-400'}`}>
                                        {formData.active && <Plus className="w-4 h-4 text-white" />}
                                    </div>
                                    <input
                                        type="checkbox"
                                        hidden
                                        checked={formData.active}
                                        onChange={e => setFormData({ ...formData, active: e.target.checked })}
                                    />
                                    <span className="text-sm font-bold text-stone-600 uppercase tracking-widest">Publicar en Tienda</span>
                                </label>
                            </div>
                        </form>

                        <div className="p-8 border-t border-stone-200 bg-white flex gap-4">
                            <button
                                type="button"
                                onClick={resetForm}
                                className="px-8 py-4 border-2 border-stone-200 text-stone-600 font-bold rounded-2xl hover:bg-stone-50 transition-colors uppercase tracking-widest text-xs"
                            >
                                Descartar
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={saving}
                                className="flex-1 py-4 bg-[var(--color-primary)] text-white font-bold rounded-2xl hover:shadow-xl hover:shadow-primary/20 transition-all disabled:opacity-50 flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-xs"
                            >
                                {saving && <Loader2 className="w-5 h-5 animate-spin" />}
                                {editingProduct ? 'Sincronizar Cambios' : 'Publicar Creación'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
