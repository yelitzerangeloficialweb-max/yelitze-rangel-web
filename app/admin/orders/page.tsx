'use client';

import { useState, useEffect } from 'react';
import { ShoppingBag, Loader2, ChevronDown, ChevronUp, Package, Mail, Phone, MapPin, Calendar, ExternalLink, Search, Filter } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface OrderItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

interface Order {
    id: string;
    createdAt: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    address: string;
    city: string;
    country: string;
    paymentMethod: string;
    status: string;
    total: number;
    items: OrderItem[];
}

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await fetch('/api/admin/orders');
            if (res.status === 401) {
                window.location.href = '/admin/login?redirect=/admin/orders';
                return;
            }
            if (!res.ok) throw new Error('Error al cargar pedidos');
            const data = await res.json();
            if (Array.isArray(data)) {
                setOrders(data);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleExpand = (id: string) => {
        setExpandedOrder(expandedOrder === id ? null : id);
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'completed': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'pending': return 'bg-amber-50 text-amber-600 border-amber-100';
            case 'cancelled': return 'bg-rose-50 text-rose-600 border-rose-100';
            default: return 'bg-stone-50 text-stone-500 border-stone-200';
        }
    };

    const filteredOrders = orders.filter(o => {
        const matchesSearch = o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             o.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             o.id.includes(searchTerm);
        const matchesStatus = statusFilter === 'all' || o.status.toLowerCase() === statusFilter.toLowerCase();
        return matchesSearch && matchesStatus;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center py-40">
                <Loader2 className="w-10 h-10 animate-spin text-[var(--color-primary)]" />
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-20 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-heading font-bold text-[var(--color-primary)] mb-2">
                        Gestión de Pedidos
                    </h1>
                    <p className="text-stone-500 font-medium italic">
                        Seguimiento de compras y despachos de tu tienda exclusiva.
                    </p>
                </div>
                <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-2xl border border-stone-100 shadow-sm">
                    <div className="text-right">
                        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Total Ingresos</p>
                        <p className="text-xl font-heading font-bold text-[var(--color-primary)]">
                            ${orders.reduce((acc, curr) => acc + curr.total, 0).toFixed(2)}
                        </p>
                    </div>
                    <div className="w-px h-8 bg-stone-100 mx-2" />
                    <div className="text-right">
                        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Pedidos</p>
                        <p className="text-xl font-heading font-bold text-[var(--color-primary)]">{orders.length}</p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-[2rem] border border-stone-100 shadow-sm">
                <div className="relative flex-grow">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300 w-5 h-5" />
                    <input 
                        type="text"
                        placeholder="Buscar por cliente, email o ID de pedido..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-transparent bg-stone-50 focus:bg-white focus:border-[var(--color-primary)] transition-all outline-none text-stone-600"
                    />
                </div>
                <div className="md:w-48 relative">
                    <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300 w-4 h-4" />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full pl-10 pr-8 py-3 rounded-xl border border-transparent bg-stone-50 focus:bg-white focus:border-[var(--color-primary)] transition-all outline-none text-stone-600 font-medium appearance-none cursor-pointer"
                    >
                        <option value="all">Todos los Estados</option>
                        <option value="pending">Pendiente</option>
                        <option value="completed">Completado</option>
                        <option value="cancelled">Cancelado</option>
                    </select>
                </div>
            </div>

            {/* Orders List */}
            {filteredOrders.length === 0 ? (
                <div className="bg-white rounded-[3rem] py-32 text-center border border-stone-100 shadow-sm">
                    <ShoppingBag className="w-16 h-16 text-stone-200 mx-auto mb-4" />
                    <h2 className="text-2xl font-heading text-stone-400 mb-2 font-bold">No hay pedidos</h2>
                    <p className="text-stone-400 max-w-sm mx-auto">Aún no se han registrado transacciones con estos criterios.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredOrders.map((order) => (
                        <div 
                            key={order.id} 
                            className={`bg-white rounded-[2rem] border transition-all duration-300 overflow-hidden ${
                                expandedOrder === order.id ? 'border-[var(--color-primary)] ring-4 ring-primary/5 shadow-xl' : 'border-stone-100 shadow-sm hover:shadow-md'
                            }`}
                        >
                            {/* Summary Card */}
                            <div 
                                onClick={() => toggleExpand(order.id)}
                                className="p-6 md:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 cursor-pointer"
                            >
                                <div className="flex items-center gap-6">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${
                                        expandedOrder === order.id ? 'bg-[var(--color-primary)] text-white' : 'bg-stone-50 text-stone-400'
                                    }`}>
                                        <Package size={24} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <p className="font-bold text-stone-900 text-lg">Order #{order.id.slice(-8).toUpperCase()}</p>
                                            <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-stone-500 font-medium">
                                            <span className="flex items-center gap-1.5"><Calendar size={14} /> {format(new Date(order.createdAt), "d 'de' MMM, yyyy", { locale: es })}</span>
                                            <span className="w-1 h-1 bg-stone-300 rounded-full hidden md:block" />
                                            <span>{order.customerName}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between lg:justify-end gap-10 border-t lg:border-t-0 pt-6 lg:pt-0">
                                    <div className="text-left lg:text-right">
                                        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Inversión Total</p>
                                        <p className="text-2xl font-heading font-bold text-[var(--color-primary)]">${order.total.toFixed(2)}</p>
                                    </div>
                                    <div className={`w-10 h-10 rounded-full border border-stone-100 flex items-center justify-center text-stone-400 transition-transform duration-300 ${expandedOrder === order.id ? 'rotate-180 bg-stone-50 text-[var(--color-primary)]' : ''}`}>
                                        <ChevronDown size={20} />
                                    </div>
                                </div>
                            </div>

                            {/* Detailed View */}
                            {expandedOrder === order.id && (
                                <div className="px-8 pb-8 animate-in slide-in-from-top-4 duration-300">
                                    <div className="grid lg:grid-cols-3 gap-8 pt-8 border-t border-stone-100">
                                        {/* Column 1: Client & Shipping */}
                                        <div className="space-y-6 lg:col-span-1">
                                            <div className="space-y-4">
                                                <h3 className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Destinatario</h3>
                                                <div className="bg-stone-50 p-6 rounded-[2rem] space-y-4 border border-stone-100">
                                                    <div className="flex items-start gap-3">
                                                        <Mail size={16} className="text-[var(--color-primary)] mt-1" />
                                                        <div>
                                                            <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-0.5">Email</p>
                                                            <p className="text-sm font-bold text-stone-900">{order.customerEmail}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start gap-3">
                                                        <Phone size={16} className="text-[var(--color-primary)] mt-1" />
                                                        <div>
                                                            <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-0.5">WhatsApp</p>
                                                            <p className="text-sm font-bold text-stone-900">{order.customerPhone}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start gap-3 border-t border-stone-200/50 pt-4 mt-4">
                                                        <MapPin size={16} className="text-[var(--color-primary)] mt-1" />
                                                        <div>
                                                            <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-0.5">Dirección de Envío</p>
                                                            <p className="text-sm font-medium text-stone-700 leading-relaxed">
                                                                {order.address}<br />
                                                                <span className="font-bold text-stone-900">{order.city}, {order.country}</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-center gap-3">
                                                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                                                    <ShoppingBag size={14} />
                                                </div>
                                                <p className="text-[10px] font-bold text-amber-700 uppercase tracking-widest">Pago via {order.paymentMethod}</p>
                                            </div>
                                        </div>

                                        {/* Column 2: Items Table */}
                                        <div className="lg:col-span-2 space-y-4">
                                            <h3 className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Detalle de Productos</h3>
                                            <div className="bg-white rounded-[2rem] border border-stone-100 overflow-hidden shadow-sm">
                                                <table className="w-full">
                                                    <thead className="bg-stone-50/50 border-b border-stone-100">
                                                        <tr>
                                                            <th className="px-6 py-4 text-[10px] font-bold text-stone-400 uppercase text-left tracking-widest">Articulo</th>
                                                            <th className="px-6 py-4 text-[10px] font-bold text-stone-400 uppercase text-center tracking-widest">Cant.</th>
                                                            <th className="px-6 py-4 text-[10px] font-bold text-stone-400 uppercase text-right tracking-widest">Inversión</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-stone-50">
                                                        {order.items.map((item) => (
                                                            <tr key={item.id} className="hover:bg-stone-50/50 transition-colors">
                                                                <td className="px-6 py-4">
                                                                    <p className="font-bold text-stone-900">{item.name}</p>
                                                                </td>
                                                                <td className="px-6 py-4 text-center">
                                                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-stone-100 text-xs font-bold text-stone-600">
                                                                        {item.quantity}
                                                                    </span>
                                                                </td>
                                                                <td className="px-6 py-4 text-right">
                                                                    <p className="font-heading font-bold text-stone-900">${(item.price * item.quantity).toFixed(2)}</p>
                                                                    <p className="text-[10px] text-stone-400 font-medium">${item.price.toFixed(2)} c/u</p>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                    <tfoot className="bg-stone-50/30 border-t border-stone-100">
                                                        <tr>
                                                            <td colSpan={2} className="px-6 py-5 text-right font-bold text-stone-400 uppercase tracking-widest text-xs">Total del Pedido:</td>
                                                            <td className="px-6 py-5 text-right">
                                                                <p className="text-2xl font-heading font-bold text-[var(--color-primary)]">${order.total.toFixed(2)}</p>
                                                            </td>
                                                        </tr>
                                                    </tfoot>
                                                </table>
                                            </div>
                                            
                                            <div className="flex justify-end gap-3 pt-4">
                                                <button className="px-6 py-3 bg-stone-100 text-stone-600 font-bold rounded-xl hover:bg-stone-200 transition-colors text-xs uppercase tracking-widest">
                                                    Imprimir Recibo
                                                </button>
                                                <button className="px-6 py-3 bg-[var(--color-primary)] text-white font-bold rounded-xl hover:bg-[var(--color-primary-light)] transition-all text-xs uppercase tracking-widest shadow-lg shadow-primary/20">
                                                    Marcar como Enviado
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
