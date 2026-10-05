import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Property } from '../../types';
import { 
  Building2, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Star, 
  ExternalLink, 
  X, 
  MapPin,
  Check,
  ImageIcon,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SingleImageUpload, MultiImageUpload } from '../../components/admin/ImageUpload';

const EMPTY_PROPERTY: Omit<Property, 'id'> = {
  slug: '',
  title: '',
  location: '',
  neighborhood: 'Baner',
  price: 15000000,
  formattedPrice: '₹1.50 Cr',
  estMonthly: '₹95,000/mo',
  beds: '3 BHK',
  baths: 3,
  sqft: '1,250 sq ft',
  category: 'Residential',
  image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
  gallery: [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85'
  ],
  description: 'Newly launched luxury residential project on prime corridor in West Pune with top-tier lifestyle amenities.',
  features: [
    'MahaRERA verified project',
    'Clubhouse, infinity pool & landscape central garden',
    'Seamless connectivity to Mumbai-Pune Expressway'
  ],
  featured: false,
  yearBuilt: 2026,
  reraId: 'P521000' + Math.floor(10000 + Math.random() * 90000),
  maintenance: '₹4,500/mo',
  possession: 'Ready to Move',
  parking: 'Covered Car Parking',
  developer: 'Reputed Pune Developer',
  agent: {
    name: 'Pravin K.',
    role: 'Principal Advisor & Founder',
    phone: '+91 97624 16737',
    email: 'kpravin2492@gmail.com',
    avatar: '/leader-pravin.jpg'
  }
};

export function AdminProperties() {
  const { properties, addProperty, updateProperty, deleteProperty } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPropertyId, setEditingPropertyId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Property, 'id'>>(EMPTY_PROPERTY);
  const [galleryInput, setGalleryInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');

  const categories = ['All', 'Residential', 'Commercial', 'Luxury Villa', 'Penthouse', 'Township'];

  const filteredProperties = properties.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.neighborhood.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.developer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenAdd = () => {
    setEditingPropertyId(null);
    setFormData({ ...EMPTY_PROPERTY });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (prop: Property) => {
    setEditingPropertyId(prop.id);
    setFormData({
      slug: prop.slug,
      title: prop.title,
      location: prop.location,
      neighborhood: prop.neighborhood,
      price: prop.price,
      formattedPrice: prop.formattedPrice,
      estMonthly: prop.estMonthly,
      beds: prop.beds,
      baths: prop.baths,
      sqft: prop.sqft,
      category: prop.category,
      image: prop.image,
      gallery: [...prop.gallery],
      description: prop.description,
      features: [...prop.features],
      featured: prop.featured || false,
      yearBuilt: prop.yearBuilt,
      reraId: prop.reraId,
      maintenance: prop.maintenance || '',
      possession: prop.possession || '',
      parking: prop.parking,
      developer: prop.developer,
      agent: { ...prop.agent }
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    if (editingPropertyId) {
      updateProperty(editingPropertyId, formData);
    } else {
      addProperty(formData);
    }
    setIsModalOpen(false);
  };

  const handleAddGalleryImage = () => {
    if (galleryInput.trim()) {
      setFormData({
        ...formData,
        gallery: [...formData.gallery, galleryInput.trim()]
      });
      setGalleryInput('');
    }
  };

  const handleRemoveGalleryImage = (index: number) => {
    setFormData({
      ...formData,
      gallery: formData.gallery.filter((_, i) => i !== index)
    });
  };

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, featureInput.trim()]
      });
      setFeatureInput('');
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-[#121316]">
            Properties & Inventory
          </h1>
          <p className="text-sm sm:text-base text-neutral-500 mt-0.5">
            Manage residential, commercial, villa, and penthouse listings across West Pune.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-[#121316] text-white hover:bg-neutral-800 text-xs sm:text-sm font-medium px-5 py-2.5 rounded-full flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Property</span>
        </button>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-neutral-200/80 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs sm:text-sm px-4 py-2 rounded-full whitespace-nowrap transition-colors cursor-pointer font-medium ${
                selectedCategory === cat
                  ? 'bg-[#121316] text-white shadow-xs'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title, location, developer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl pl-10 pr-4 py-2 text-xs sm:text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-[#C86D2F]"
          />
        </div>
      </div>

      {/* Clean Listings Table */}
      <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200/80 text-neutral-500 text-xs font-mono uppercase tracking-wider">
                <th className="py-4 px-6">Property</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Pricing</th>
                <th className="py-4 px-6">Specs</th>
                <th className="py-4 px-6">Featured</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredProperties.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-14 text-neutral-400 text-sm">
                    No properties match your filter.
                  </td>
                </tr>
              ) : (
                filteredProperties.map((prop) => (
                  <tr key={prop.id} className="hover:bg-neutral-50/80 transition-colors">
                    
                    {/* Title & Info */}
                    <td className="py-4.5 px-6">
                      <div className="flex items-center gap-3.5">
                        <img
                          src={prop.image}
                          alt={prop.title}
                          className="w-16 h-14 rounded-2xl object-cover shrink-0 border border-neutral-200 shadow-2xs"
                        />
                        <div className="max-w-xs sm:max-w-sm">
                          <p className="font-medium text-neutral-900 text-sm sm:text-base line-clamp-1">{prop.title}</p>
                          <p className="text-xs text-neutral-500 line-clamp-1 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3.5 h-3.5 shrink-0 text-neutral-400" />
                            <span>{prop.neighborhood}</span>
                            <span>•</span>
                            <span>{prop.developer}</span>
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4.5 px-6">
                      <span className="bg-[#FDE8D7] text-[#121316] font-semibold px-3 py-1 rounded-full text-xs inline-block">
                        {prop.category}
                      </span>
                    </td>

                    {/* Pricing */}
                    <td className="py-4.5 px-6">
                      <div className="font-semibold text-neutral-900 text-sm sm:text-base font-mono">{prop.formattedPrice}</div>
                      <div className="text-xs text-neutral-400">{prop.estMonthly}</div>
                    </td>

                    {/* Specs */}
                    <td className="py-4.5 px-6 text-neutral-600">
                      <div className="font-medium text-neutral-800">{prop.beds}</div>
                      <div className="text-xs text-neutral-400">{prop.sqft}</div>
                    </td>

                    {/* Featured */}
                    <td className="py-4.5 px-6">
                      <button
                        onClick={() => updateProperty(prop.id, { featured: !prop.featured })}
                        className={`px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer transition-colors ${
                          prop.featured
                            ? 'bg-amber-100 text-amber-900 font-semibold'
                            : 'bg-neutral-100 text-neutral-400 hover:bg-neutral-200'
                        }`}
                        title={prop.featured ? 'Featured on Homepage' : 'Not Featured'}
                      >
                        <Star className={`w-3.5 h-3.5 ${prop.featured ? 'fill-amber-500 text-amber-600' : ''}`} />
                        <span>{prop.featured ? 'Featured' : 'Standard'}</span>
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-4.5 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          to={`/properties/${prop.slug}`}
                          target="_blank"
                          title="View live page"
                          className="p-2 rounded-xl text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleOpenEdit(prop)}
                          title="Edit listing"
                          className="p-2 rounded-xl text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete "${prop.title}"?`)) {
                              deleteProperty(prop.id);
                            }
                          }}
                          title="Delete listing"
                          className="p-2 rounded-xl text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Redesigned Luxury Modal for Add / Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white w-full max-w-5xl rounded-3xl sm:rounded-[32px] shadow-2xl border border-neutral-200/80 my-auto max-h-[92vh] flex flex-col text-left overflow-hidden animate-scale-up">
            
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-neutral-100 flex items-center justify-between bg-white sticky top-0 z-20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#FDE8D7] text-[#121316] flex items-center justify-center border border-[#F7D0B2]/60 shadow-xs">
                  <Building2 className="w-5 h-5 text-[#C86D2F]" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-medium text-neutral-900 tracking-tight">
                    {editingPropertyId ? 'Edit Property Listing' : 'Add New Property Listing'}
                  </h2>
                  <p className="text-xs text-neutral-500">
                    {editingPropertyId ? `Updating inventory ID: ${formData.id}` : 'Fill in details below to publish listing to the live catalogue.'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleSave} className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
              
              {/* Section 1: Core Property Details */}
              <div className="bg-neutral-50/70 border border-neutral-200/80 rounded-3xl p-5 sm:p-7 space-y-5">
                <div className="flex items-center gap-2.5 pb-3 border-b border-neutral-200/60">
                  <span className="w-6 h-6 rounded-full bg-[#121316] text-white text-xs font-semibold flex items-center justify-center">1</span>
                  <h3 className="text-sm sm:text-base font-medium text-neutral-900 tracking-tight">Property Overview & Location</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="block text-xs sm:text-sm font-medium text-neutral-700">Property Title *</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. Rohan Ekam Premium Residences"
                      className="w-full bg-white border border-neutral-200 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-neutral-800 focus:outline-none focus:border-[#C86D2F] focus:ring-2 focus:ring-[#FDE8D7]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs sm:text-sm font-medium text-neutral-700">Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                      className="w-full bg-white border border-neutral-200 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-neutral-800 focus:outline-none focus:border-[#C86D2F] focus:ring-2 focus:ring-[#FDE8D7]"
                    >
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Luxury Villa">Luxury Villa</option>
                      <option value="Penthouse">Penthouse</option>
                      <option value="Township">Township</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs sm:text-sm font-medium text-neutral-700">Neighborhood / Micro-Market *</label>
                    <input
                      type="text"
                      required
                      value={formData.neighborhood}
                      onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                      placeholder="e.g. Baner, Balewadi, Hinjewadi"
                      className="w-full bg-white border border-neutral-200 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-neutral-800 focus:outline-none focus:border-[#C86D2F] focus:ring-2 focus:ring-[#FDE8D7]"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="block text-xs sm:text-sm font-medium text-neutral-700">Full Address / Landmark *</label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. Baner Road, Near Highway, Baner, Pune 411045"
                      className="w-full bg-white border border-neutral-200 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-neutral-800 focus:outline-none focus:border-[#C86D2F] focus:ring-2 focus:ring-[#FDE8D7]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs sm:text-sm font-medium text-neutral-700">Developer / Builder</label>
                    <input
                      type="text"
                      value={formData.developer}
                      onChange={(e) => setFormData({ ...formData, developer: e.target.value })}
                      placeholder="e.g. Rohan Builders & Developers"
                      className="w-full bg-white border border-neutral-200 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-neutral-800 focus:outline-none focus:border-[#C86D2F] focus:ring-2 focus:ring-[#FDE8D7]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs sm:text-sm font-medium text-neutral-700">MahaRERA Registration ID</label>
                    <input
                      type="text"
                      value={formData.reraId}
                      onChange={(e) => setFormData({ ...formData, reraId: e.target.value })}
                      placeholder="e.g. P52100052341"
                      className="w-full bg-white border border-neutral-200 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-neutral-800 focus:outline-none focus:border-[#C86D2F] focus:ring-2 focus:ring-[#FDE8D7]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs sm:text-sm font-medium text-neutral-700">Year Built / Handover</label>
                    <input
                      type="number"
                      value={formData.yearBuilt}
                      onChange={(e) => setFormData({ ...formData, yearBuilt: parseInt(e.target.value) || 2026 })}
                      placeholder="2028"
                      className="w-full bg-white border border-neutral-200 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-neutral-800 focus:outline-none focus:border-[#C86D2F] focus:ring-2 focus:ring-[#FDE8D7]"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Pricing & Specifications */}
              <div className="bg-neutral-50/70 border border-neutral-200/80 rounded-3xl p-5 sm:p-7 space-y-5">
                <div className="flex items-center gap-2.5 pb-3 border-b border-neutral-200/60">
                  <span className="w-6 h-6 rounded-full bg-[#121316] text-white text-xs font-semibold flex items-center justify-center">2</span>
                  <h3 className="text-sm sm:text-base font-medium text-neutral-900 tracking-tight">Pricing, Dimensions & Configuration</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-xs sm:text-sm font-medium text-neutral-700">Formatted Price Display *</label>
                    <input
                      type="text"
                      required
                      value={formData.formattedPrice}
                      onChange={(e) => setFormData({ ...formData, formattedPrice: e.target.value })}
                      placeholder="e.g. ₹1.30 Cr - ₹2.10 Cr"
                      className="w-full bg-white border border-neutral-200 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-neutral-800 focus:outline-none focus:border-[#C86D2F] focus:ring-2 focus:ring-[#FDE8D7]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs sm:text-sm font-medium text-neutral-700">Exact Price (₹ Numeric) *</label>
                    <input
                      type="number"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                      placeholder="13000000"
                      className="w-full bg-white border border-neutral-200 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-neutral-800 focus:outline-none focus:border-[#C86D2F] focus:ring-2 focus:ring-[#FDE8D7]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs sm:text-sm font-medium text-neutral-700">Estimated Monthly EMI</label>
                    <input
                      type="text"
                      value={formData.estMonthly}
                      onChange={(e) => setFormData({ ...formData, estMonthly: e.target.value })}
                      placeholder="e.g. ₹85,000/mo"
                      className="w-full bg-white border border-neutral-200 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-neutral-800 focus:outline-none focus:border-[#C86D2F] focus:ring-2 focus:ring-[#FDE8D7]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs sm:text-sm font-medium text-neutral-700">Bedrooms / Configuration</label>
                    <input
                      type="text"
                      value={formData.beds}
                      onChange={(e) => setFormData({ ...formData, beds: e.target.value })}
                      placeholder="e.g. 2 & 3 BHK"
                      className="w-full bg-white border border-neutral-200 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-neutral-800 focus:outline-none focus:border-[#C86D2F] focus:ring-2 focus:ring-[#FDE8D7]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs sm:text-sm font-medium text-neutral-700">Carpet Area / Usable Sq Ft</label>
                    <input
                      type="text"
                      value={formData.sqft}
                      onChange={(e) => setFormData({ ...formData, sqft: e.target.value })}
                      placeholder="e.g. 700 - 1,150 sq ft"
                      className="w-full bg-white border border-neutral-200 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-neutral-800 focus:outline-none focus:border-[#C86D2F] focus:ring-2 focus:ring-[#FDE8D7]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs sm:text-sm font-medium text-neutral-700">Possession Timeline</label>
                    <input
                      type="text"
                      value={formData.possession}
                      onChange={(e) => setFormData({ ...formData, possession: e.target.value })}
                      placeholder="e.g. Ready to Move or Dec 2028"
                      className="w-full bg-white border border-neutral-200 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-neutral-800 focus:outline-none focus:border-[#C86D2F]"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: High-Definition Media & Visual Assets */}
              <div className="bg-neutral-50/70 border border-neutral-200/80 rounded-3xl p-5 sm:p-7 space-y-6">
                <div className="flex items-center gap-2.5 pb-3 border-b border-neutral-200/60">
                  <span className="w-6 h-6 rounded-full bg-[#121316] text-white text-xs font-semibold flex items-center justify-center">3</span>
                  <h3 className="text-sm sm:text-base font-medium text-neutral-900 tracking-tight">Property Photography & Gallery</h3>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Single Cover Upload */}
                  <div className="space-y-2">
                    <SingleImageUpload
                      label="Cover / Primary Hero Photo *"
                      value={formData.image}
                      onChange={(url) => setFormData({ ...formData, image: url })}
                      aspectRatio="video"
                      helperText="Drop primary hero banner here or browse"
                    />
                  </div>

                  {/* Multi Gallery Upload */}
                  <div className="space-y-2">
                    <MultiImageUpload
                      label="Additional Interior & Exterior Gallery"
                      values={formData.gallery}
                      onChange={(urls) => setFormData({ ...formData, gallery: urls })}
                      helperText="Drop multiple gallery photos or browse files"
                    />
                  </div>
                </div>
              </div>

              {/* Section 4: Description & Amenities */}
              <div className="bg-neutral-50/70 border border-neutral-200/80 rounded-3xl p-5 sm:p-7 space-y-5">
                <div className="flex items-center gap-2.5 pb-3 border-b border-neutral-200/60">
                  <span className="w-6 h-6 rounded-full bg-[#121316] text-white text-xs font-semibold flex items-center justify-center">4</span>
                  <h3 className="text-sm sm:text-base font-medium text-neutral-900 tracking-tight">Narrative & Curated Amenities</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs sm:text-sm font-medium text-neutral-700">Detailed Property Description</label>
                    <textarea
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Detail the layout, architectural hallmarks, ventilation, luxury finishes, and strategic location advantages..."
                      className="w-full bg-white border border-neutral-200 rounded-2xl px-4 py-3 text-xs sm:text-sm text-neutral-800 focus:outline-none focus:border-[#C86D2F] focus:ring-2 focus:ring-[#FDE8D7]"
                    />
                  </div>

                  {/* Features & Preset Amenities */}
                  <div className="space-y-3 pt-2">
                    <label className="block text-xs sm:text-sm font-medium text-neutral-700">
                      Key Amenities & Highlights ({formData.features.length})
                    </label>

                    {/* Quick Preset Badges */}
                    <div className="flex flex-wrap items-center gap-2 pb-1">
                      <span className="text-xs text-neutral-500 font-medium">Quick Presets:</span>
                      {[
                        'Infinity Pool & Clubhouse',
                        'MahaRERA Approved',
                        'Covered Car Parking',
                        'EV Charging Stations',
                        'High-Speed Elevators',
                        '24/7 Multi-Tier Security',
                        'Landscaped Zen Garden',
                        'Vastu Compliant Layout'
                      ].map((preset) => {
                        const isAdded = formData.features.includes(preset);
                        return (
                          <button
                            key={preset}
                            type="button"
                            onClick={() => {
                              if (!isAdded) {
                                setFormData({ ...formData, features: [...formData.features, preset] });
                              }
                            }}
                            disabled={isAdded}
                            className={`text-xs px-3 py-1 rounded-full border transition-all cursor-pointer ${
                              isAdded
                                ? 'bg-neutral-200 text-neutral-400 border-neutral-200 cursor-default'
                                : 'bg-white text-neutral-700 border-neutral-300 hover:border-[#C86D2F] hover:text-[#C86D2F]'
                            }`}
                          >
                            + {preset}
                          </button>
                        );
                      })}
                    </div>

                    {/* Custom Add Feature Field */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={featureInput}
                        onChange={(e) => setFeatureInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddFeature();
                          }
                        }}
                        placeholder="Type custom amenity and press Enter or click Add..."
                        className="flex-1 bg-white border border-neutral-200 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-neutral-800 focus:outline-none focus:border-[#C86D2F]"
                      />
                      <button
                        type="button"
                        onClick={handleAddFeature}
                        className="bg-[#121316] text-white px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-medium hover:bg-neutral-800 transition-colors cursor-pointer shrink-0"
                      >
                        Add Amenity
                      </button>
                    </div>

                    {/* Active Amenities Chips Grid */}
                    {formData.features.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {formData.features.map((feat, idx) => (
                          <div 
                            key={idx} 
                            className="inline-flex items-center gap-2 bg-[#FDE8D7]/80 text-[#121316] border border-[#F7D0B2] px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium animate-fade-in"
                          >
                            <span>{feat}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveFeature(idx)}
                              className="text-neutral-500 hover:text-red-600 transition-colors cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Homepage Pin Toggle */}
              <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <label htmlFor="featuredToggle" className="text-xs sm:text-sm font-medium text-neutral-900 cursor-pointer">
                      Featured Property Showcase
                    </label>
                    <p className="text-xs text-neutral-500">
                      Display this property prominently in the curated featured collection on the homepage.
                    </p>
                  </div>
                </div>

                <input
                  type="checkbox"
                  id="featuredToggle"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-5 h-5 rounded-md text-[#121316] border-neutral-300 focus:ring-[#C86D2F] cursor-pointer"
                />
              </div>

              {/* Sticky Footer Actions */}
              <div className="pt-4 border-t border-neutral-100 flex items-center justify-end gap-3 sticky bottom-0 bg-white z-20 py-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 rounded-full text-xs sm:text-sm text-neutral-600 hover:bg-neutral-100 font-medium transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 rounded-full text-xs sm:text-sm font-semibold bg-[#121316] text-white hover:bg-neutral-800 transition-all cursor-pointer shadow-md active:scale-95 flex items-center gap-2"
                >
                  <Check className="w-4 h-4 text-[#FDE8D7]" />
                  <span>{editingPropertyId ? 'Save Changes' : 'Publish to Portfolio'}</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
