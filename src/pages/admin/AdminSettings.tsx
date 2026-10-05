import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { 
  Settings, 
  Save, 
  Database, 
  Upload, 
  Download, 
  RefreshCcw, 
  CheckCircle2, 
  AlertTriangle,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  Layout,
  BarChart3
} from 'lucide-react';
import { SingleImageUpload } from '../../components/admin/ImageUpload';

export function AdminSettings() {
  const { 
    settings, 
    updateSettings, 
    exportBackupJSON, 
    importBackupJSON, 
    resetToDefaultData,
    supabaseOnline,
    isSyncing,
    syncLocalToSupabase,
    refreshFromSupabase
  } = useData();

  const [form, setForm] = useState({ ...settings });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [cloudSyncStatus, setCloudSyncStatus] = useState<string | null>(null);
  const [isPushingCloud, setIsPushingCloud] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSettings(form);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleCloudSync = async () => {
    setIsPushingCloud(true);
    setCloudSyncStatus('Pushing all properties, blog posts, leads & settings to Supabase...');
    const result = await syncLocalToSupabase();
    setIsPushingCloud(false);
    if (result.success) {
      setCloudSyncStatus(`Cloud sync completed successfully! Pushed ${result.counts?.properties || 0} properties, ${result.counts?.blogPosts || 0} posts, and settings to Supabase.`);
      setTimeout(() => setCloudSyncStatus(null), 5000);
    } else {
      setCloudSyncStatus(`Sync error: ${result.message || 'Make sure your Supabase SQL schema tables have been created.'}`);
    }
  };

  const handleCloudPull = async () => {
    setIsPushingCloud(true);
    setCloudSyncStatus('Fetching latest data from Supabase...');
    const success = await refreshFromSupabase();
    setIsPushingCloud(false);
    if (success) {
      setCloudSyncStatus('Successfully refreshed data from Supabase!');
      setTimeout(() => setCloudSyncStatus(null), 4000);
    } else {
      setCloudSyncStatus('Could not pull from Supabase. Ensure tables are created in SQL Editor.');
    }
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = importBackupJSON(content);
        if (success) {
          setImportStatus('Backup successfully restored!');
          setTimeout(() => {
            setImportStatus(null);
            window.location.reload();
          }, 1000);
        } else {
          setImportStatus('Error: Invalid backup file structure.');
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-8 text-left pb-16">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-[#121316]">
            Site Settings
          </h1>
          <p className="text-sm sm:text-base text-neutral-500 mt-0.5">
            Customize hero headline, contact details, social links, stats counters, and download full backups.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 border ${
            supabaseOnline 
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
              : 'bg-amber-50 text-amber-700 border-amber-200'
          }`}>
            <span className={`w-2 h-2 rounded-full ${supabaseOnline ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
            <span>{supabaseOnline ? 'Supabase Connected' : 'Local Storage Mode'}</span>
          </div>

          {saveSuccess && (
            <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-4 py-2 rounded-full text-xs sm:text-sm flex items-center gap-2 animate-fade-in font-medium shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Settings saved & synced!</span>
            </div>
          )}
        </div>
      </div>

      {/* Supabase Cloud Live Sync Box */}
      <div className="bg-gradient-to-br from-[#121316] via-[#1A1C22] to-[#121316] text-white rounded-3xl p-6 sm:p-8 border border-neutral-800 shadow-lg space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C86D2F]/20 text-[#FDE8D7] flex items-center justify-center border border-[#C86D2F]/30">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-white tracking-tight flex items-center gap-2">
                Supabase Cloud Database
                <span className="text-[11px] font-mono font-normal uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  deiqcqpwcqbzfijblqgj
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
                Live cloud persistence for properties, blog articles, client inquiries, and settings.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              disabled={isPushingCloud || isSyncing}
              onClick={handleCloudPull}
              className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs sm:text-sm font-medium transition-all flex items-center gap-2 border border-neutral-700 disabled:opacity-50 cursor-pointer active:scale-95"
            >
              <RefreshCcw className={`w-3.5 h-3.5 ${isPushingCloud ? 'animate-spin' : ''}`} />
              <span>Pull from Supabase</span>
            </button>

            <button
              type="button"
              disabled={isPushingCloud || isSyncing}
              onClick={handleCloudSync}
              className="px-5 py-2.5 rounded-xl bg-[#FDE8D7] hover:bg-[#F7D0B2] text-[#121316] text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shadow-xs disabled:opacity-50 cursor-pointer active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-[#C86D2F]" />
              <span>{isPushingCloud ? 'Syncing...' : 'Push Local Data to Supabase'}</span>
            </button>
          </div>
        </div>

        {cloudSyncStatus && (
          <div className="p-3.5 bg-white/10 border border-white/20 text-xs sm:text-sm rounded-xl font-medium text-neutral-200 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#FDE8D7] shrink-0" />
            <span>{cloudSyncStatus}</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Section 1: Hero Section Customizer */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-xs space-y-6">
          <div className="flex items-center gap-2.5 pb-3.5 border-b border-neutral-100">
            <Layout className="w-5 h-5 text-[#C86D2F]" />
            <h2 className="text-base sm:text-lg font-medium text-neutral-900 tracking-tight">
              Hero Banner & Branding
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2 space-y-1.5">
              <label className="block text-sm font-medium text-neutral-700">Hero Main Headline</label>
              <input
                type="text"
                required
                value={form.hero.title}
                onChange={(e) => setForm({
                  ...form,
                  hero: { ...form.hero, title: e.target.value }
                })}
                placeholder="Find the Right Property. Make the Right Move."
                className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-4 py-2.5 text-sm text-neutral-800 focus:outline-none focus:border-[#C86D2F]"
              />
            </div>

            <div className="sm:col-span-2 space-y-1.5">
              <label className="block text-sm font-medium text-neutral-700">Hero Subtitle / Description</label>
              <textarea
                rows={2}
                required
                value={form.hero.subtitle}
                onChange={(e) => setForm({
                  ...form,
                  hero: { ...form.hero, subtitle: e.target.value }
                })}
                placeholder="Your trusted partner for residential, commercial & luxury properties in Baner, Balewadi & West Pune."
                className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-4 py-2.5 text-sm text-neutral-800 focus:outline-none focus:border-[#C86D2F]"
              />
            </div>

            <div className="sm:col-span-2">
              <SingleImageUpload
                label="Hero Background Image"
                value={form.hero.bgImage}
                onChange={(url) => setForm({
                  ...form,
                  hero: { ...form.hero, bgImage: url }
                })}
                aspectRatio="wide"
                helperText="Drop hero backdrop banner here or browse"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:col-span-2">
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-neutral-700">Primary Button Label</label>
                <input
                  type="text"
                  value={form.hero.primaryBtnText}
                  onChange={(e) => setForm({
                    ...form,
                    hero: { ...form.hero, primaryBtnText: e.target.value }
                  })}
                  placeholder="Explore Properties"
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-4 py-2.5 text-sm text-neutral-800 focus:outline-none focus:border-[#C86D2F]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-neutral-700">Secondary Button Label</label>
                <input
                  type="text"
                  value={form.hero.secondaryBtnText}
                  onChange={(e) => setForm({
                    ...form,
                    hero: { ...form.hero, secondaryBtnText: e.target.value }
                  })}
                  placeholder="Request Callback"
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-4 py-2.5 text-sm text-neutral-800 focus:outline-none focus:border-[#C86D2F]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Stats & Key Metrics */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-xs space-y-6">
          <div className="flex items-center gap-2.5 pb-3.5 border-b border-neutral-100">
            <BarChart3 className="w-5 h-5 text-[#C86D2F]" />
            <h2 className="text-base sm:text-lg font-medium text-neutral-900 tracking-tight">
              Trust Statistics & Key Numbers
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs sm:text-sm font-medium text-neutral-700">Years Experience</label>
              <input
                type="number"
                value={form.stats.yearsExperience}
                onChange={(e) => setForm({
                  ...form,
                  stats: { ...form.stats, yearsExperience: Number(e.target.value) }
                })}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-4 py-2.5 text-sm text-neutral-800 focus:outline-none focus:border-[#C86D2F]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs sm:text-sm font-medium text-neutral-700">Happy Clients</label>
              <input
                type="number"
                value={form.stats.happyClients}
                onChange={(e) => setForm({
                  ...form,
                  stats: { ...form.stats, happyClients: Number(e.target.value) }
                })}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-4 py-2.5 text-sm text-neutral-800 focus:outline-none focus:border-[#C86D2F]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs sm:text-sm font-medium text-neutral-700">Area Delivered</label>
              <input
                type="text"
                value={form.stats.areaDelivered}
                onChange={(e) => setForm({
                  ...form,
                  stats: { ...form.stats, areaDelivered: e.target.value }
                })}
                placeholder="1.2M+"
                className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-4 py-2.5 text-sm text-neutral-800 focus:outline-none focus:border-[#C86D2F]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs sm:text-sm font-medium text-neutral-700">Client Rating</label>
              <input
                type="number"
                step="0.1"
                value={form.stats.clientRating}
                onChange={(e) => setForm({
                  ...form,
                  stats: { ...form.stats, clientRating: Number(e.target.value) }
                })}
                placeholder="4.9"
                className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-4 py-2.5 text-sm text-neutral-800 focus:outline-none focus:border-[#C86D2F]"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Contact & Legal Credentials */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-xs space-y-6">
          <div className="flex items-center gap-2.5 pb-3.5 border-b border-neutral-100">
            <Phone className="w-5 h-5 text-[#C86D2F]" />
            <h2 className="text-base sm:text-lg font-medium text-neutral-900 tracking-tight">
              Corporate Contact & MahaRERA Registration
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-neutral-700">Official Phone Number</label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+91 97624 16737"
                className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-4 py-2.5 text-sm text-neutral-800 focus:outline-none focus:border-[#C86D2F]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-neutral-700">WhatsApp Digits (with country code)</label>
              <input
                type="text"
                value={form.whatsapp}
                onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                placeholder="919762416737"
                className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-4 py-2.5 text-sm text-neutral-800 focus:outline-none focus:border-[#C86D2F]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-neutral-700">Official Support Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="kpravin2492@gmail.com"
                className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-4 py-2.5 text-sm text-neutral-800 focus:outline-none focus:border-[#C86D2F]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-neutral-700">MahaRERA Registration Number</label>
              <input
                type="text"
                value={form.mahaRera}
                onChange={(e) => setForm({ ...form, mahaRera: e.target.value })}
                placeholder="A52100028741"
                className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-4 py-2.5 text-sm text-neutral-800 focus:outline-none focus:border-[#C86D2F]"
              />
            </div>

            <div className="sm:col-span-2 space-y-1.5">
              <label className="block text-sm font-medium text-neutral-700">Balewadi HQ Office Address</label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder="Office 1011, 10th Floor, Nandan Probiz, Baner-Balewadi Road, Pune, Maharashtra 411045"
                className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-4 py-2.5 text-sm text-neutral-800 focus:outline-none focus:border-[#C86D2F]"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Social Links */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-xs space-y-6">
          <h2 className="text-base sm:text-lg font-medium text-neutral-900 pb-3 border-b border-neutral-100 tracking-tight">
            Social Media Channels
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-neutral-700">LinkedIn Profile URL</label>
              <input
                type="url"
                value={form.socials.linkedin}
                onChange={(e) => setForm({
                  ...form,
                  socials: { ...form.socials, linkedin: e.target.value }
                })}
                placeholder="https://in.linkedin.com/company/pravin-realty"
                className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-4 py-2.5 text-sm text-neutral-800 focus:outline-none focus:border-[#C86D2F]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-neutral-700">Instagram Profile URL</label>
              <input
                type="url"
                value={form.socials.instagram}
                onChange={(e) => setForm({
                  ...form,
                  socials: { ...form.socials, instagram: e.target.value }
                })}
                placeholder="https://instagram.com/pravinrealty"
                className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-4 py-2.5 text-sm text-neutral-800 focus:outline-none focus:border-[#C86D2F]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-neutral-700">YouTube Channel URL</label>
              <input
                type="url"
                value={form.socials.youtube}
                onChange={(e) => setForm({
                  ...form,
                  socials: { ...form.socials, youtube: e.target.value }
                })}
                placeholder="https://youtube.com/@pravinrealty"
                className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-4 py-2.5 text-sm text-neutral-800 focus:outline-none focus:border-[#C86D2F]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-neutral-700">Facebook Page URL</label>
              <input
                type="url"
                value={form.socials.facebook}
                onChange={(e) => setForm({
                  ...form,
                  socials: { ...form.socials, facebook: e.target.value }
                })}
                placeholder="https://facebook.com/pravinrealty"
                className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-4 py-2.5 text-sm text-neutral-800 focus:outline-none focus:border-[#C86D2F]"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[#121316] text-white hover:bg-neutral-800 text-sm font-semibold px-8 py-3.5 rounded-full flex items-center gap-2.5 transition-all shadow-md cursor-pointer active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Save & Publish Changes</span>
          </button>
        </div>

      </form>

      {/* Section 5: Backup, Restore & Reset */}
      <div className="bg-[#121316] text-white rounded-3xl p-6 sm:p-10 space-y-6">
        <div className="flex items-center gap-3">
          <Database className="w-6 h-6 text-[#FDE8D7]" />
          <h2 className="text-lg sm:text-xl font-medium text-white tracking-tight">
            Data Vault & Cloud Backup
          </h2>
        </div>

        <p className="text-sm text-neutral-400 max-w-2xl leading-relaxed">
          Easily export all your custom property listings, blog articles, client leads, and website configurations into a single JSON file. You can import this file anytime to restore or migrate your site data.
        </p>

        {importStatus && (
          <div className="p-4 bg-white/10 border border-white/20 text-sm rounded-2xl font-medium">
            {importStatus}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            type="button"
            onClick={exportBackupJSON}
            className="bg-[#FDE8D7] text-[#121316] hover:bg-[#F7D0B2] text-sm font-semibold px-5 py-3 rounded-2xl flex items-center gap-2 transition-colors cursor-pointer active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Export Full Backup JSON</span>
          </button>

          <label className="bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-medium px-5 py-3 rounded-2xl flex items-center gap-2 transition-colors cursor-pointer border border-neutral-700 active:scale-95">
            <Upload className="w-4 h-4" />
            <span>Restore / Import JSON</span>
            <input
              type="file"
              accept=".json"
              onChange={handleFileImport}
              className="hidden"
            />
          </label>

          <button
            type="button"
            onClick={() => {
              if (window.confirm('Are you sure you want to reset all data to default? This will clear custom changes.')) {
                resetToDefaultData();
                window.location.reload();
              }
            }}
            className="text-red-400 hover:text-red-300 hover:bg-red-950/40 text-sm font-medium px-5 py-3 rounded-2xl flex items-center gap-2 transition-colors cursor-pointer ml-auto border border-red-900/40"
          >
            <RefreshCcw className="w-4 h-4" />
            <span>Reset to Default Data</span>
          </button>
        </div>
      </div>

    </div>
  );
}
