'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Package, Loader2 } from 'lucide-react';
import Image from 'next/image';

interface Product {
    id: string;
    name: string;
    subtitle?: string;
    description: string;
    price: number;
    image: string;
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
    const [formData, setFormData] = useState({
        name: '',
        subtitle: '',
        description: '',
        price: '',
        image: '',
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
        setFormData({
            name: product.name,
            subtitle: product.subtitle || '',
            description: product.description,
            price: product.price.toString(),
            image: product.image,
            category: product.category,
            stock: product.stock.toString(),
            featured: product.featured,
            active: product.active
        });
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás segura de eliminar este producto?')) return;

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
            category: 'libro',
            stock: '10',
            featured: false,
            active: true
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
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-heading text-[var(--color-primary)] font-bold">
                        Productos
                    </h1>
                    <p className="text-stone-500">{products.length} productos en total</p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-[var(--color-primary)] text-white font-bold rounded-xl hover:bg-[var(--color-primary-light)] transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Nuevo Producto
                </button>
            </div>

            {/* Product Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-stone-100">
                            <h2 className="text-2xl font-heading text-[var(--color-primary)] font-bold">
                                {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
                            </h2>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-stone-700 mb-1">Nombre *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[var(--color-secondary)]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-stone-700 mb-1">Subtítulo</label>
                                    <input
                                        type="text"
                                        value={formData.subtitle}
                                        onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[var(--color-secondary)]"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-1">Descripción *</label>
                                <textarea
                                    required
                                    rows={3}
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[var(--color-secondary)]"
                                />
                            </div>

                            <div className="grid md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-stone-700 mb-1">Precio (USD) *</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        required
                                        value={formData.price}
                                        onChange={e => setFormData({ ...formData, price: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[var(--color-secondary)]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-stone-700 mb-1">Categoría *</label>
                                    <select
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[var(--color-secondary)]"
                                    >
                                        <option value="libro">Libro</option>
                                        <option value="oraculo">Oráculo</option>
                                        <option value="accesorio">Accesorio</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-stone-700 mb-1">Stock</label>
                                    <input
                                        type="number"
                                        value={formData.stock}
                                        onChange={e => setFormData({ ...formData, stock: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[var(--color-secondary)]"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-1">URL de Imagen</label>
                                <input
                                    type="text"
                                    placeholder="/assets/images/shop/producto.jpg"
                                    value={formData.image}
                                    onChange={e => setFormData({ ...formData, image: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[var(--color-secondary)]"
                                />
                            </div>

                            <div className="flex gap-6">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.featured}
                                        onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                                        className="w-5 h-5 rounded"
                                    />
                                    <span className="text-sm text-stone-700">Destacado</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.active}
                                        onChange={e => setFormData({ ...formData, active: e.target.checked })}
                                        className="w-5 h-5 rounded"
                                    />
                                    <span className="text-sm text-stone-700">Activo (visible en tienda)</span>
                                </label>
                            </div>

                            <div className="flex gap-4 pt-4 border-t border-stone-100">
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="flex-1 py-3 border-2 border-stone-200 text-stone-600 font-bold rounded-xl hover:bg-stone-50 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex-1 py-3 bg-[var(--color-primary)] text-white font-bold rounded-xl hover:bg-[var(--color-primary-light)] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                                    {editingProduct ? 'Guardar Cambios' : 'Crear Producto'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Products Table */}
            {products.length === 0 ? (
                <div className="bg-white rounded-3xl p-16 text-center">
                    <Package className="w-16 h-16 text-stone-200 mx-auto mb-4" />
                    <h2 className="text-xl font-heading text-[var(--color-primary)] mb-2">No hay productos</h2>
                    <p className="text-stone-500 mb-6">Añade tu primer producto para empezar a vender</p>
                    <button
                        onClick={() => setShowForm(true)}
                        className="px-6 py-3 bg-[var(--color-primary)] text-white font-bold rounded-xl hover:bg-[var(--color-primary-light)] transition-colors"
                    >
                        Añadir Producto
                    </button>
                </div>
            ) : (
                <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
                    <table className="w-full">
                        <thead className="bg-stone-50 border-b border-stone-100">
                            <tr>
                                <th className="text-left px-6 py-4 text-sm font-medium text-stone-500">Producto</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-stone-500">Categoría</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-stone-500">Precio</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-stone-500">Stock</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-stone-500">Estado</th>
                                <th className="text-right px-6 py-4 text-sm font-medium text-stone-500">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                            {products.map(product => (
                                <tr key={product.id} className="hover:bg-stone-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0">
                                                {product.image && (
                                                    <Image
                                                        src={product.image}
                                                        alt={product.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-medium text-[var(--color-primary)]">{product.name}</p>
                                                {product.subtitle && (
                                                    <p className="text-sm text-stone-500">{product.subtitle}</p>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 rounded-full bg-stone-100 text-xs font-medium text-stone-600">
                                            {CATEGORY_LABELS[product.category] || product.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-[var(--color-secondary)]">
                                        ${product.price.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 text-stone-600">
                                        {product.stock}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${product.active ? 'bg-green-100 text-green-700' : 'bg-stone-100 text-stone-500'}`}>
                                            {product.active ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleEdit(product)}
                                                className="p-2 text-stone-400 hover:text-[var(--color-secondary)] hover:bg-stone-100 rounded-lg transition-colors"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
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
            )}
        </div>
    );
}
