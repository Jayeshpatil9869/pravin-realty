import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { UploadCloud, Image as ImageIcon, X, Link as LinkIcon, Check, Trash2, Plus } from 'lucide-react';

/**
 * Compresses an image file on the client before saving to Data URL
 * to ensure localStorage remains performant.
 */
export function compressImageFile(file: File, maxWidth = 1200, quality = 0.82): Promise<string> {
  return new Promise((resolve) => {
    // If it's an SVG, read directly as data URL without canvas compression
    if (file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string || '');
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(img.src);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = () => resolve(event.target?.result as string || '');
    };
    reader.onerror = () => resolve('');
    reader.readAsDataURL(file);
  });
}

interface SingleImageUploadProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  className?: string;
  aspectRatio?: 'square' | 'video' | 'wide' | 'auto';
  helperText?: string;
}

export function SingleImageUpload({
  label,
  value,
  onChange,
  placeholder = 'Choose image file or enter URL...',
  className = '',
  aspectRatio = 'video',
  helperText = 'Drag & drop image here, or browse files (JPG, PNG, WebP)'
}: SingleImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const [urlInput, setUrlInput] = useState(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const processFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, JPG, WebP, SVG).');
      return;
    }
    setIsProcessing(true);
    try {
      const dataUrl = await compressImageFile(file, 1200, 0.82);
      if (dataUrl) {
        onChange(dataUrl);
        setUrlInput(dataUrl);
      }
    } catch (err) {
      console.error('Failed to process image:', err);
    } finally {
      setIsProcessing(false);
      setIsDragging(false);
    }
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      await processFile(file);
    }
  };

  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      await processFile(file);
    }
  };

  const handleUrlApply = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
    }
  };

  const handleClear = () => {
    onChange('');
    setUrlInput('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const aspectClass = 
    aspectRatio === 'square' ? 'aspect-square' :
    aspectRatio === 'wide' ? 'aspect-21/9' :
    aspectRatio === 'video' ? 'aspect-16/9' : 'min-h-[140px]';

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <div className="flex items-center justify-between">
          <label className="block text-xs font-medium text-neutral-700">{label}</label>
          <div className="flex items-center gap-1 text-[11px]">
            <button
              type="button"
              onClick={() => setMode('upload')}
              className={`px-2 py-0.5 rounded-md cursor-pointer transition-colors ${
                mode === 'upload' ? 'bg-[#121316] text-white font-medium' : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              Upload / Drop
            </button>
            <button
              type="button"
              onClick={() => setMode('url')}
              className={`px-2 py-0.5 rounded-md cursor-pointer transition-colors ${
                mode === 'url' ? 'bg-[#121316] text-white font-medium' : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              Paste URL
            </button>
          </div>
        </div>
      )}

      {/* Mode 1: File Upload / Drag and Drop */}
      {mode === 'upload' ? (
        <div>
          {value ? (
            /* Preview Container with Replace / Clear */
            <div className={`relative rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-900 group ${aspectClass}`}>
              <img
                src={value}
                alt="Uploaded preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-white/90 hover:bg-white text-[#121316] text-xs font-medium px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-md cursor-pointer transition-transform active:scale-95"
                >
                  <UploadCloud className="w-3.5 h-3.5" />
                  <span>Replace</span>
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="bg-red-600 hover:bg-red-700 text-white text-xs font-medium px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-md cursor-pointer transition-transform active:scale-95"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*"
                className="hidden"
              />
            </div>
          ) : (
            /* Drag and Drop Zone */
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-[#C86D2F] bg-[#FDE8D7]/30 scale-[1.01]'
                  : 'border-neutral-200 hover:border-neutral-300 bg-neutral-50/60 hover:bg-neutral-50'
              } ${aspectClass}`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*"
                className="hidden"
              />

              <div className="w-10 h-10 rounded-2xl bg-white border border-neutral-200/80 flex items-center justify-center text-neutral-600 mb-2 shadow-2xs">
                {isProcessing ? (
                  <div className="w-5 h-5 border-2 border-[#C86D2F] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <UploadCloud className="w-5 h-5 text-[#C86D2F]" />
                )}
              </div>

              <div className="text-xs font-medium text-neutral-800">
                {isDragging ? 'Drop your image here' : 'Click to browse or drag & drop'}
              </div>
              <p className="text-[11px] text-neutral-400 mt-1 max-w-xs">
                {helperText}
              </p>
            </div>
          )}
        </div>
      ) : (
        /* Mode 2: Direct URL Input */
        <div className="space-y-2">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <LinkIcon className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={urlInput}
                onChange={(e) => {
                  setUrlInput(e.target.value);
                  onChange(e.target.value);
                }}
                placeholder="https://images.unsplash.com/... or /hero-villa.png"
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl pl-9 pr-3 py-2 text-xs text-neutral-800 focus:outline-none focus:border-[#C86D2F]"
              />
            </div>
            {urlInput && (
              <button
                type="button"
                onClick={handleClear}
                className="p-2 text-neutral-400 hover:text-red-500 rounded-xl hover:bg-neutral-100"
                title="Clear"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {value && (
            <div className="relative w-24 h-16 rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100">
              <img src={value} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface MultiImageUploadProps {
  label?: string;
  values: string[];
  onChange: (urls: string[]) => void;
  className?: string;
  helperText?: string;
}

export function MultiImageUpload({
  label = 'Gallery Images',
  values = [],
  onChange,
  className = '',
  helperText = 'Drag and drop multiple photos here or click to select files.'
}: MultiImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const processFiles = async (fileList: FileList | File[]) => {
    setIsProcessing(true);
    const files = Array.from(fileList).filter(f => f.type.startsWith('image/'));
    const newUrls: string[] = [];

    for (const file of files) {
      try {
        const dataUrl = await compressImageFile(file, 1200, 0.82);
        if (dataUrl) newUrls.push(dataUrl);
      } catch (err) {
        console.error('Failed to process image:', err);
      }
    }

    if (newUrls.length > 0) {
      onChange([...values, ...newUrls]);
    }
    setIsProcessing(false);
    setIsDragging(false);
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await processFiles(e.dataTransfer.files);
    }
  };

  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await processFiles(e.target.files);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updated = values.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleAddUrl = () => {
    if (urlInput.trim()) {
      onChange([...values, urlInput.trim()]);
      setUrlInput('');
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="block text-xs font-medium text-neutral-700">
          {label} ({values.length} uploaded)
        </label>
        {values.length > 0 && (
          <button
            type="button"
            onClick={() => onChange([])}
            className="text-[11px] text-red-500 hover:text-red-700 cursor-pointer"
          >
            Clear All Gallery
          </button>
        )}
      </div>

      {/* Drag & Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
          isDragging
            ? 'border-[#C86D2F] bg-[#FDE8D7]/30 scale-[1.01]'
            : 'border-neutral-200 hover:border-neutral-300 bg-neutral-50/60 hover:bg-neutral-50'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/*"
          multiple
          className="hidden"
        />

        <div className="w-10 h-10 rounded-2xl bg-white border border-neutral-200/80 flex items-center justify-center text-neutral-600 mb-2 shadow-2xs">
          {isProcessing ? (
            <div className="w-5 h-5 border-2 border-[#C86D2F] border-t-transparent rounded-full animate-spin" />
          ) : (
            <UploadCloud className="w-5 h-5 text-[#C86D2F]" />
          )}
        </div>

        <div className="text-xs font-medium text-neutral-800">
          {isDragging ? 'Drop gallery photos here' : 'Click to select or drag & drop multiple files'}
        </div>
        <p className="text-[11px] text-neutral-400 mt-1">
          {helperText}
        </p>
      </div>

      {/* Manual URL append */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <LinkIcon className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddUrl();
              }
            }}
            placeholder="Or add single image URL..."
            className="w-full bg-neutral-50 border border-neutral-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-neutral-800 focus:outline-none focus:border-[#C86D2F]"
          />
        </div>
        <button
          type="button"
          onClick={handleAddUrl}
          className="bg-neutral-800 hover:bg-neutral-900 text-white text-xs px-3 py-1.5 rounded-xl flex items-center gap-1 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add URL</span>
        </button>
      </div>

      {/* Uploaded Gallery Grid */}
      {values.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5 pt-1">
          {values.map((url, idx) => (
            <div
              key={idx}
              className="relative group rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100 aspect-video shadow-2xs"
            >
              <img
                src={url}
                alt={`Gallery item ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveImage(idx);
                }}
                className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/70 hover:bg-red-600 text-white flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                title="Remove image"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              <span className="absolute bottom-1 left-1 bg-black/60 text-white text-[9px] px-1.5 py-0.2 rounded">
                #{idx + 1}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
