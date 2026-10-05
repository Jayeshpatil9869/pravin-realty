import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Lead } from '../../types';
import { 
  Inbox, 
  Search, 
  Phone, 
  MessageCircle, 
  Download, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Edit3, 
  X,
  FileSpreadsheet,
  AlertCircle
} from 'lucide-react';

export function AdminLeads() {
  const { leads, updateLeadStatus, deleteLead, clearAllLeads } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [noteInput, setNoteInput] = useState('');

  const statuses = ['All', 'New', 'Contacted', 'In Progress', 'Closed', 'Archived'];

  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = selectedStatus === 'All' || lead.status === selectedStatus;
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery) ||
      (lead.propertyTitle && lead.propertyTitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (lead.message && lead.message.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const handleExportCSV = () => {
    if (leads.length === 0) return;

    const headers = ['ID', 'Date', 'Name', 'Email', 'Phone', 'Category', 'Property', 'Source', 'Status', 'Message', 'Internal Notes'];
    const rows = leads.map(l => [
      l.id,
      l.date,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.email.replace(/"/g, '""')}"`,
      `"${l.phone.replace(/"/g, '""')}"`,
      `"${(l.category || '').replace(/"/g, '""')}"`,
      `"${(l.propertyTitle || '').replace(/"/g, '""')}"`,
      `"${l.source.replace(/"/g, '""')}"`,
      l.status,
      `"${(l.message || '').replace(/"/g, '""')}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', encodeURI(csvContent));
    downloadAnchor.setAttribute('download', `pravin-realty-inquiries-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleOpenNotes = (lead: Lead) => {
    setEditingLead(lead);
    setNoteInput(lead.notes || '');
  };

  const handleSaveNotes = () => {
    if (editingLead) {
      updateLeadStatus(editingLead.id, editingLead.status, noteInput);
      setEditingLead(null);
    }
  };

  return (
    <div className="space-y-8 text-left">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-[#121316]">
            Inquiries & Leads
          </h1>
          <p className="text-sm sm:text-base text-neutral-500 mt-0.5">
            Real-time inquiries received from website consultation forms, property pages, and WhatsApp triggers.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="bg-white border border-neutral-200/90 hover:bg-neutral-50 text-neutral-800 text-xs sm:text-sm font-medium px-4 py-2.5 rounded-full flex items-center gap-2 transition-all shadow-xs cursor-pointer active:scale-95"
          >
            <Download className="w-4 h-4 text-neutral-600" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Controls */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-neutral-200/80 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Status Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0">
          {statuses.map((st) => {
            const count = st === 'All' ? leads.length : leads.filter(l => l.status === st).length;
            return (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`text-xs sm:text-sm px-4 py-2 rounded-full whitespace-nowrap transition-colors cursor-pointer flex items-center gap-2 font-medium ${
                  selectedStatus === st
                    ? 'bg-[#121316] text-white shadow-xs'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                <span>{st}</span>
                <span className={`text-xs px-2 py-0.2 rounded-full font-bold ${
                  selectedStatus === st ? 'bg-white/20 text-white' : 'bg-neutral-200 text-neutral-700'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search leads by name, email, phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl pl-10 pr-4 py-2 text-xs sm:text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-[#C86D2F]"
          />
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200/80 text-neutral-500 font-mono text-xs uppercase tracking-wider">
                <th className="py-4 px-6">Client Contact</th>
                <th className="py-4 px-6">Requirement / Property</th>
                <th className="py-4 px-6">Source & Date</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Internal Notes</th>
                <th className="py-4 px-6 text-right">Quick Contact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-14 text-neutral-400 text-sm">
                    No client inquiries found matching this view.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => {
                  const cleanPhone = lead.phone.replace(/[^0-9]/g, '');
                  const waLink = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hello ${lead.name}, this is Pravin Realty following up on your property inquiry.`)}`;

                  return (
                    <tr key={lead.id} className="hover:bg-neutral-50/80 transition-colors">
                      
                      {/* Contact Info */}
                      <td className="py-4.5 px-6">
                        <div className="font-medium text-neutral-900 text-sm sm:text-base">{lead.name}</div>
                        <div className="text-neutral-500 text-xs mt-0.5">{lead.email}</div>
                        <div className="text-neutral-600 font-mono text-xs mt-0.5">{lead.phone}</div>
                      </td>

                      {/* Requirement */}
                      <td className="py-4.5 px-6 max-w-xs">
                        {lead.propertyTitle && (
                          <div className="font-medium text-[#121316] line-clamp-1 mb-1 text-sm">
                            {lead.propertyTitle}
                          </div>
                        )}
                        {lead.category && (
                          <span className="inline-block bg-[#FDE8D7] text-[#121316] text-xs font-semibold px-2.5 py-0.5 rounded-full mb-1">
                            {lead.category}
                          </span>
                        )}
                        <p className="text-neutral-600 line-clamp-2 text-xs leading-relaxed">
                          {lead.message || 'No specific message entered.'}
                        </p>
                      </td>

                      {/* Source & Date */}
                      <td className="py-4.5 px-6">
                        <div className="bg-neutral-100 text-neutral-800 font-medium px-2.5 py-1 rounded-lg text-xs inline-block mb-1">
                          {lead.source}
                        </div>
                        <div className="text-xs text-neutral-400 font-mono flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {lead.date}
                        </div>
                      </td>

                      {/* Status Selector */}
                      <td className="py-4.5 px-6">
                        <select
                          value={lead.status}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                          className={`text-xs font-semibold px-3 py-1.5 rounded-xl outline-none border cursor-pointer transition-colors ${
                            lead.status === 'New'
                              ? 'bg-amber-50 text-amber-900 border-amber-200'
                              : lead.status === 'Contacted'
                              ? 'bg-blue-50 text-blue-900 border-blue-200'
                              : lead.status === 'In Progress'
                              ? 'bg-purple-50 text-purple-900 border-purple-200'
                              : lead.status === 'Closed'
                              ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                              : 'bg-neutral-100 text-neutral-700 border-neutral-200'
                          }`}
                        >
                          <option value="New">🟡 New</option>
                          <option value="Contacted">🔵 Contacted</option>
                          <option value="In Progress">🟣 In Progress</option>
                          <option value="Closed">🟢 Closed Deal</option>
                          <option value="Archived">⚪ Archived</option>
                        </select>
                      </td>

                      {/* Internal Notes */}
                      <td className="py-4.5 px-6 max-w-[220px]">
                        <div 
                          onClick={() => handleOpenNotes(lead)}
                          className="cursor-pointer group flex items-start justify-between gap-1 text-xs text-neutral-600 hover:text-neutral-900 bg-neutral-50 p-2.5 rounded-xl border border-neutral-200/70 hover:border-neutral-300"
                        >
                          <span className="line-clamp-2 leading-relaxed">
                            {lead.notes || 'Click to add note...'}
                          </span>
                          <Edit3 className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-800 shrink-0 mt-0.5" />
                        </div>
                      </td>

                      {/* Quick Actions */}
                      <td className="py-4.5 px-6 text-right">
                        <div className="flex items-center justify-end gap-1.5">
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
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete lead from "${lead.name}"?`)) {
                                deleteLead(lead.id);
                              }
                            }}
                            className="p-2 rounded-xl text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Note Editing Modal */}
      {editingLead && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-4 text-left">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-neutral-900 text-sm">
                Follow-up Notes for {editingLead.name}
              </h3>
              <button onClick={() => setEditingLead(null)} className="text-neutral-400 hover:text-neutral-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <textarea
              rows={4}
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              placeholder="e.g. Client requested a site visit on Saturday 3 PM. Sent brochure on WhatsApp."
              className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-3 text-xs text-neutral-800 focus:outline-none focus:border-[#C86D2F]"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingLead(null)}
                className="px-4 py-2 rounded-xl text-xs text-neutral-600 hover:bg-neutral-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNotes}
                className="px-5 py-2 rounded-xl text-xs font-medium bg-[#121316] text-white hover:bg-neutral-800"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
