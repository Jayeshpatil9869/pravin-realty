import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { 
  Building2, 
  Inbox, 
  BookOpen, 
  Users, 
  Plus, 
  ArrowRight, 
  Phone, 
  MessageCircle, 
  MapPin
} from 'lucide-react';

export function AdminDashboard() {
  const { properties, blogPosts, teamMembers, leads, updateLeadStatus } = useData();

  const newLeads = leads.filter(l => l.status === 'New');
  const featuredProperties = properties.filter(p => p.featured);

  const categoryCounts = {
    Residential: properties.filter(p => p.category === 'Residential').length,
    Commercial: properties.filter(p => p.category === 'Commercial').length,
    'Luxury Villa': properties.filter(p => p.category === 'Luxury Villa').length,
    Penthouse: properties.filter(p => p.category === 'Penthouse').length,
    Township: properties.filter(p => p.category === 'Township').length,
  };

  return (
    <div className="space-y-8 text-left">
      
      {/* Sleek Luxury Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200/80 shadow-xs">
        <div>
          <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-[#121316]">
            Welcome to the Control Center
          </h1>
          <p className="text-sm sm:text-base text-neutral-500 mt-1">
            Manage listings, market insights, and buyer inquiries across West Pune.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/properties"
            className="bg-[#121316] hover:bg-neutral-800 text-white text-xs sm:text-sm font-medium px-5 py-2.5 rounded-full flex items-center gap-2 transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Property</span>
          </Link>

          <Link
            to="/admin/blog"
            className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs sm:text-sm font-medium px-5 py-2.5 rounded-full flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Write Insight</span>
          </Link>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <Link 
          to="/admin/properties" 
          className="bg-white p-6 rounded-3xl border border-neutral-200/80 hover:border-neutral-300 hover:shadow-md transition-all shadow-xs group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-neutral-500">Active Listings</span>
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-4xl sm:text-5xl font-light tracking-tight text-[#121316]">
              {properties.length}
            </div>
            <p className="text-xs text-neutral-500 mt-2">
              <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">{featuredProperties.length} Featured</span> on Homepage
            </p>
          </div>
        </Link>

        <Link 
          to="/admin/leads" 
          className="bg-white p-6 rounded-3xl border border-neutral-200/80 hover:border-neutral-300 hover:shadow-md transition-all shadow-xs group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-neutral-500">Client Inquiries</span>
            <div className="w-10 h-10 rounded-2xl bg-[#FDE8D7] text-[#C86D2F] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Inbox className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-4xl sm:text-5xl font-light tracking-tight text-[#121316]">
              {leads.length}
            </div>
            <p className="text-xs text-neutral-500 mt-2">
              <span className="text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded-full">{newLeads.length} Unread</span> pending follow-up
            </p>
          </div>
        </Link>

        <Link 
          to="/admin/blog" 
          className="bg-white p-6 rounded-3xl border border-neutral-200/80 hover:border-neutral-300 hover:shadow-md transition-all shadow-xs group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-neutral-500">Market Insights</span>
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-4xl sm:text-5xl font-light tracking-tight text-[#121316]">
              {blogPosts.length}
            </div>
            <p className="text-xs text-neutral-500 mt-2">
              Published Pune Real Estate Guides
            </p>
          </div>
        </Link>

        <Link 
          to="/admin/team" 
          className="bg-white p-6 rounded-3xl border border-neutral-200/80 hover:border-neutral-300 hover:shadow-md transition-all shadow-xs group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-neutral-500">Advisory Team</span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-4xl sm:text-5xl font-light tracking-tight text-[#121316]">
              {teamMembers.length}
            </div>
            <p className="text-xs text-neutral-500 mt-2">
              Active West Pune Consultants
            </p>
          </div>
        </Link>

      </div>

      {/* Main Grid: Recent Inquiries & Portfolio Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Recent Inquiries (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
            <div>
              <h2 className="text-lg font-medium text-[#121316] tracking-tight">
                Recent Inquiries & Site Visits
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
                Latest leads captured from website consultation forms and property pages
              </p>
            </div>
            <Link 
              to="/admin/leads" 
              className="text-xs sm:text-sm text-[#C86D2F] hover:text-[#9A3412] font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span>View All ({leads.length})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="divide-y divide-neutral-100">
            {leads.slice(0, 4).map((lead) => {
              const cleanPhone = lead.phone.replace(/[^0-9]/g, '');
              const waLink = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hello ${lead.name}, this is Pravin Realty following up on your inquiry.`)}`;

              return (
                <div key={lead.id} className="py-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="font-medium text-neutral-900 text-sm sm:text-base">{lead.name}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        lead.status === 'New' 
                          ? 'bg-amber-100 text-amber-800' 
                          : lead.status === 'Contacted' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {lead.status}
                      </span>
                      <span className="text-neutral-400 text-xs font-mono">{lead.date}</span>
                    </div>

                    <p className="text-neutral-600 line-clamp-1 text-xs sm:text-sm leading-relaxed">
                      {lead.message || lead.notes || 'Inquired about properties in West Pune.'}
                    </p>

                    <div className="flex items-center gap-3 text-xs text-neutral-500 flex-wrap">
                      <span>{lead.email}</span>
                      <span>•</span>
                      <span className="font-mono">{lead.phone}</span>
                      {lead.propertyTitle && (
                        <>
                          <span>•</span>
                          <span className="text-[#C86D2F] font-medium truncate max-w-xs">{lead.propertyTitle}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors shadow-2xs"
                      title="Chat on WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                    <a
                      href={`tel:${lead.phone}`}
                      className="p-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors shadow-2xs"
                      title="Call Client"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                    <select
                      value={lead.status}
                      onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                      className="bg-neutral-100 text-neutral-800 border-none rounded-xl px-3 py-1.5 text-xs font-medium outline-none cursor-pointer hover:bg-neutral-200 transition-colors"
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Portfolio Breakdown (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-xs space-y-6">
          <div className="pb-3 border-b border-neutral-100">
            <h3 className="text-lg font-medium text-[#121316] tracking-tight">
              Portfolio Distribution
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
              Active inventory count by category
            </p>
          </div>
          
          <div className="space-y-3">
            {Object.entries(categoryCounts).map(([cat, count]) => (
              <div key={cat} className="flex items-center justify-between py-2 border-b border-neutral-100/80 last:border-0">
                <span className="text-sm font-medium text-neutral-700">{cat}</span>
                <span className="font-semibold text-neutral-900 bg-neutral-100 px-3 py-1 rounded-full text-xs font-mono">
                  {count} {count === 1 ? 'unit' : 'units'}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link
              to="/admin/properties"
              className="w-full text-center block text-sm bg-neutral-100 hover:bg-neutral-200 text-neutral-800 py-3 rounded-2xl font-medium transition-colors"
            >
              Manage All Properties
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
