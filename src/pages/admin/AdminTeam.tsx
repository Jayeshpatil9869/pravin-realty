import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { TeamMember } from '../../types';
import { 
  Users, 
  Plus, 
  Edit3, 
  Trash2, 
  Phone, 
  Mail, 
  MapPin, 
  X, 
  Award
} from 'lucide-react';
import { SingleImageUpload } from '../../components/admin/ImageUpload';

const EMPTY_MEMBER: Omit<TeamMember, 'id'> = {
  name: '',
  role: 'Senior Property Consultant',
  bio: 'Experienced real estate advisor specializing in Baner, Balewadi, and West Pune property investments.',
  image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
  phone: '+91 97624 16737',
  email: 'advisor@pravinrealty.com',
  specialty: 'Baner & Balewadi Residential'
};

export function AdminTeam() {
  const { teamMembers, addTeamMember, updateTeamMember, deleteTeamMember } = useData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<TeamMember, 'id'>>(EMPTY_MEMBER);

  const handleOpenAdd = () => {
    setEditingMemberId(null);
    setFormData({ ...EMPTY_MEMBER });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (member: TeamMember) => {
    setEditingMemberId(member.id);
    setFormData({
      name: member.name,
      role: member.role,
      bio: member.bio,
      image: member.image,
      phone: member.phone,
      email: member.email,
      specialty: member.specialty
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    if (editingMemberId) {
      updateTeamMember(editingMemberId, formData);
    } else {
      addTeamMember(formData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 text-left">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-[#121316]">
            Team & Advisors
          </h1>
          <p className="text-sm sm:text-base text-neutral-500 mt-0.5">
            Manage the consultants, brokers, and specialists displayed on the About Us page and property listings.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-[#121316] text-white hover:bg-neutral-800 text-xs sm:text-sm font-medium px-5 py-2.5 rounded-full flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Team Member</span>
        </button>
      </div>

      {/* Team Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-3xl border border-neutral-200/80 p-6 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-5"
          >
            <div className="space-y-3.5">
              <div className="flex items-center gap-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-16 h-16 rounded-2xl object-cover border border-neutral-200 shadow-2xs shrink-0"
                />
                <div>
                  <h3 className="font-medium text-neutral-900 text-base sm:text-lg leading-snug">
                    {member.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500">{member.role}</p>
                  <span className="inline-block bg-[#FDE8D7] text-[#121316] text-xs font-semibold px-2.5 py-0.5 rounded-full mt-1.5">
                    {member.specialty}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed line-clamp-3">
                {member.bio}
              </p>

              <div className="space-y-1.5 pt-3 border-t border-neutral-100 text-xs sm:text-sm text-neutral-500">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-neutral-400" />
                  <span className="font-mono text-neutral-700">{member.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-neutral-400" />
                  <span className="text-neutral-700">{member.email}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-100 flex items-center justify-end gap-1.5">
              <button
                onClick={() => handleOpenEdit(member)}
                className="p-2 rounded-xl text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                title="Edit member"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  if (window.confirm(`Delete team member "${member.name}"?`)) {
                    deleteTeamMember(member.id);
                  }
                }}
                className="p-2 rounded-xl text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                title="Delete member"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-neutral-200 my-auto max-h-[90vh] flex flex-col text-left overflow-hidden">
            
            <div className="p-4 sm:p-5 border-b border-neutral-100 flex items-center justify-between bg-white sticky top-0 z-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#FDE8D7] text-[#121316] flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <h2 className="text-base sm:text-lg font-medium text-neutral-900">
                  {editingMemberId ? 'Edit Team Member' : 'Add Team Member'}
                </h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:bg-neutral-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
              
              <div className="space-y-1">
                <label className="block text-xs font-medium text-neutral-700">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Ankita Joshi"
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2 text-xs text-neutral-800 focus:outline-none focus:border-[#C86D2F]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-neutral-700">Role / Designation *</label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g. Head of Residential Advisory"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2 text-xs text-neutral-800 focus:outline-none focus:border-[#C86D2F]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-medium text-neutral-700">Specialty</label>
                  <input
                    type="text"
                    value={formData.specialty}
                    onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                    placeholder="e.g. Baner & Balewadi Residential"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2 text-xs text-neutral-800 focus:outline-none focus:border-[#C86D2F]"
                  />
                </div>
              </div>

              <SingleImageUpload
                label="Photo / Avatar *"
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
                aspectRatio="square"
                helperText="Drop profile photo here or click to browse"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-neutral-700">Phone</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 97624 16737"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2 text-xs text-neutral-800 focus:outline-none focus:border-[#C86D2F]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-medium text-neutral-700">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ankita@pravinrealty.com"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2 text-xs text-neutral-800 focus:outline-none focus:border-[#C86D2F]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-medium text-neutral-700">Bio & Experience</label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Tell clients about their expertise, experience, and accomplishments..."
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2 text-xs text-neutral-800 focus:outline-none focus:border-[#C86D2F]"
                />
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center justify-end gap-3 sticky bottom-0 bg-white">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-medium bg-[#121316] text-white hover:bg-neutral-800 cursor-pointer shadow-sm"
                >
                  {editingMemberId ? 'Update Member' : 'Add Member'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
