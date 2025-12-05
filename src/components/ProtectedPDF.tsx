import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';

interface ProtectedPDFProps {
  title: string;
  titleEn?: string;
  content: React.ReactNode;
  contentEn?: React.ReactNode;
  filename: string;
}

const PDF_PASSWORD = import.meta.env.VITE_PDF_PASSWORD || '240307';

export const ProtectedPDF: React.FC<ProtectedPDFProps> = ({ title, titleEn, content, contentEn, filename }) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [pdfSuccess, setPdfSuccess] = useState(false);
  const navigate = useNavigate();

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === PDF_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Mot de passe incorrect');
      setPassword('');
    }
  };

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    setPdfSuccess(false);
    
    try {
      const frenchElement = document.getElementById('pdf-content');
      const englishElement = document.getElementById('pdf-content-en');
    
    const hasBilingual = contentEn !== undefined && frenchElement && englishElement;
    
    // Create A4 PDF
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    const gap = 8; // Gap between columns
    const columnWidth = (pageWidth - (margin * 2) - gap) / 2;
    const leftX = margin;
    const rightX = margin + columnWidth + gap;
    
    // Helper function to load image (works with Vercel static assets)
    const loadImage = (src: string): Promise<string> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        // For Vercel, static assets are served from root
        // Try with absolute path first, then relative
        const imageSrc = src.startsWith('/') ? src : `/${src}`;
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          try {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0);
              resolve(canvas.toDataURL('image/png'));
            } else {
              reject(new Error('Could not get canvas context'));
            }
          } catch (error) {
            reject(error);
          }
        };
        img.onerror = () => reject(new Error(`Failed to load image: ${imageSrc}`));
        img.src = imageSrc;
      });
    };
    
    // Helper function to add header branding
    const addHeaderBranding = async (doc: jsPDF, yPos: number): Promise<number> => {
      let currentY = yPos;
      try {
        const logoData = await loadImage('/favicon.svg').catch(() => 
          loadImage('/header.png').catch(() => null)
        );
        
        if (logoData) {
          const logoSize = 12;
          doc.addImage(logoData, 'PNG', margin, currentY, logoSize, logoSize);
          doc.setFontSize(10);
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(74, 20, 20);
          doc.text('BPD', margin + logoSize + 3, currentY + 4);
          doc.setFontSize(6);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(111, 111, 111);
          doc.text('BUREAU DE PROTECTION DIGITALE', margin + logoSize + 3, currentY + 7.5);
        } else {
          doc.setFontSize(10);
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(74, 20, 20);
          doc.text('BPD', margin, currentY + 4);
          doc.setFontSize(6);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(111, 111, 111);
          doc.text('BUREAU DE PROTECTION DIGITALE', margin, currentY + 7.5);
        }
      } catch (error) {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(74, 20, 20);
        doc.text('BPD', margin, currentY + 4);
        doc.setFontSize(6);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(111, 111, 111);
        doc.text('BUREAU DE PROTECTION DIGITALE', margin, currentY + 7.5);
      }
      
      currentY += 12;
      doc.setDrawColor(74, 20, 20);
      doc.setLineWidth(0.5);
      doc.line(margin, currentY, pageWidth - margin, currentY);
      currentY += 5;
      doc.setTextColor(0, 0, 0);
      return currentY;
    };
    
    // Extract content sections by matching structure
    const extractSections = (element: HTMLElement) => {
      const sections: Array<{ heading?: string; paragraphs: string[] }> = [];
      
      // Find the main content div (skip the "Français"/"English" header)
      const contentDiv = Array.from(element.children).find(
        child => child.tagName.toLowerCase() === 'div' && 
        child.className.includes('space-y-4')
      ) as HTMLElement;
      
      if (!contentDiv) return sections;
      
      // Get all direct child divs (each section)
      const sectionDivs = Array.from(contentDiv.children).filter(
        child => child.tagName.toLowerCase() === 'div'
      ) as HTMLElement[];
      
      sectionDivs.forEach(sectionDiv => {
        const section: { heading?: string; paragraphs: string[] } = { paragraphs: [] };
        
        // Find h3 heading
        const heading = sectionDiv.querySelector('h3');
        if (heading) {
          section.heading = heading.textContent?.trim() || '';
        }
        
        // Find all paragraphs and list items
        const paragraphs = sectionDiv.querySelectorAll('p');
        paragraphs.forEach(p => {
          const text = p.textContent?.trim() || '';
          if (text && 
              !text.includes('Document confidentiel') && 
              !text.includes('Dernière mise à jour') &&
              !text.includes('Last updated') &&
              !text.includes('Confidential document')) {
            section.paragraphs.push(text);
          }
        });
        
        // Also check for divs with list items (starting with —)
        const divs = sectionDiv.querySelectorAll('div');
        divs.forEach(div => {
          const text = div.textContent?.trim() || '';
          if (text && 
              (text.startsWith('—') || text.startsWith('-')) && 
              !text.includes('Document confidentiel') &&
              !text.includes('Dernière mise à jour') &&
              !text.includes('Last updated')) {
            // Check if this text is already in paragraphs (avoid duplicates)
            if (!section.paragraphs.some(p => p === text || p.includes(text.substring(0, 20)))) {
              section.paragraphs.push(text);
            }
          }
        });
        
        if (section.heading || section.paragraphs.length > 0) {
          sections.push(section);
        }
      });
      
      return sections;
    };
    
    let y = margin;
    
    // Add branded header with logo
    y = await addHeaderBranding(doc, y);
    
    // Add title
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    const titleText = titleEn ? `${title} / ${titleEn}` : title;
    const titleLines = doc.splitTextToSize(titleText, pageWidth - (margin * 2));
    doc.text(titleLines, margin, y);
    y += titleLines.length * 7 + 5;
    
    // Add column headers
    if (hasBilingual) {
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text('Français', leftX, y);
      doc.text('English', rightX, y);
      y += 6;
      
      // Draw a line under headers
      doc.setLineWidth(0.5);
      doc.line(leftX, y - 2, leftX + columnWidth, y - 2);
      doc.line(rightX, y - 2, rightX + columnWidth, y - 2);
      y += 3;
    }
    
    // Add bilingual content
    if (hasBilingual && frenchElement && englishElement) {
      const frenchSections = extractSections(frenchElement);
      const englishSections = extractSections(englishElement);
      
      // Match sections by index
      const maxSections = Math.max(frenchSections.length, englishSections.length);
      
      for (let i = 0; i < maxSections; i++) {
        const frSection = frenchSections[i];
        const enSection = englishSections[i];
        
        // Calculate heights for both columns
        let frHeight = 0;
        let enHeight = 0;
        
          doc.setFontSize(10);
        
        // Calculate French section height
        if (frSection) {
          if (frSection.heading) {
            doc.setFont('helvetica', 'bold');
            const frHeadingLines = doc.splitTextToSize(frSection.heading, columnWidth);
            frHeight += frHeadingLines.length * 5 + 2;
          }
          doc.setFont('helvetica', 'normal');
          frSection.paragraphs.forEach(para => {
            const frParaLines = doc.splitTextToSize(para, columnWidth);
            frHeight += frParaLines.length * 4.5 + 1;
          });
        }
        
        // Calculate English section height
        if (enSection) {
          if (enSection.heading) {
            doc.setFont('helvetica', 'bold');
            const enHeadingLines = doc.splitTextToSize(enSection.heading, columnWidth);
            enHeight += enHeadingLines.length * 5 + 2;
          }
          doc.setFont('helvetica', 'normal');
          enSection.paragraphs.forEach(para => {
            const enParaLines = doc.splitTextToSize(para, columnWidth);
            enHeight += enParaLines.length * 4.5 + 1;
          });
        }
        
        // Use max height for alignment
        const sectionHeight = Math.max(frHeight, enHeight, 8);
        
        // Check if we need a new page
        if (y + sectionHeight > pageHeight - margin - 15) {
          doc.addPage();
          y = margin;
          
          // Add header branding on new page
          y = await addHeaderBranding(doc, y);
          
          // Redraw column headers on new page
          doc.setFontSize(10);
          doc.setFont('helvetica', 'bold');
          doc.text('Français', leftX, y);
          doc.text('English', rightX, y);
          y += 6;
          doc.setLineWidth(0.5);
          doc.line(leftX, y - 2, leftX + columnWidth, y - 2);
          doc.line(rightX, y - 2, rightX + columnWidth, y - 2);
          y += 3;
        }
        
        const startY = y;
        
        // Draw French column
        if (frSection) {
          let currentY = startY;
          doc.setFontSize(10);
          
          if (frSection.heading) {
            doc.setFont('helvetica', 'bold');
            const frHeadingLines = doc.splitTextToSize(frSection.heading, columnWidth);
            frHeadingLines.forEach((line: string) => {
              doc.text(line, leftX, currentY);
              currentY += 5;
            });
            doc.setFont('helvetica', 'normal');
            currentY += 1;
          }
          
          frSection.paragraphs.forEach(para => {
            const frParaLines = doc.splitTextToSize(para, columnWidth);
            frParaLines.forEach((line: string) => {
              doc.text(line, leftX, currentY);
              currentY += 4.5;
            });
            currentY += 1;
          });
        }
        
        // Draw English column
        if (enSection) {
          let currentY = startY;
          doc.setFontSize(10);
          
          if (enSection.heading) {
            doc.setFont('helvetica', 'bold');
            const enHeadingLines = doc.splitTextToSize(enSection.heading, columnWidth);
            enHeadingLines.forEach((line: string) => {
              doc.text(line, rightX, currentY);
              currentY += 5;
            });
            doc.setFont('helvetica', 'normal');
            currentY += 1;
          }
          
          enSection.paragraphs.forEach(para => {
            const enParaLines = doc.splitTextToSize(para, columnWidth);
            enParaLines.forEach((line: string) => {
              doc.text(line, rightX, currentY);
              currentY += 4.5;
            });
            currentY += 1;
          });
        }
        
        // Move to next section
        y += sectionHeight + 4;
      }
    } else if (frenchElement) {
      // Single language fallback
      const sections = extractSections(frenchElement);
      doc.setFontSize(11);
      
      for (const section of sections) {
        if (y > pageHeight - margin - 15) {
          doc.addPage();
          y = margin;
          y = await addHeaderBranding(doc, y);
        }
        
        if (section.heading) {
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(12);
          const headingLines = doc.splitTextToSize(section.heading, pageWidth - (margin * 2));
          for (const line of headingLines) {
            if (y > pageHeight - margin - 15) {
              doc.addPage();
              y = margin;
              y = await addHeaderBranding(doc, y);
            }
            doc.text(line, margin, y);
            y += 7;
          }
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(11);
          y += 2;
        }
        
        for (const para of section.paragraphs) {
          const paraLines = doc.splitTextToSize(para, pageWidth - (margin * 2));
          for (const line of paraLines) {
            if (y > pageHeight - margin - 15) {
              doc.addPage();
              y = margin;
              y = await addHeaderBranding(doc, y);
            }
            doc.text(line, margin, y);
            y += 6;
          }
          y += 1;
        }
        
        y += 3;
      }
    }
    
    // Add branded footer on all pages
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      
      // Draw footer line
      doc.setDrawColor(74, 20, 20); // BPD red
      doc.setLineWidth(0.3);
      doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);
      
      // Footer text
      doc.setFontSize(7);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(111, 111, 111); // BPD grey
      
      // Left side: Confidential notice
      doc.text(
        'Document confidentiel — Bureau de Protection Digitale',
        margin,
        pageHeight - 8
      );
      
      // Right side: Page number
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(74, 20, 20); // BPD red
      const pageText = `Page ${i}/${totalPages}`;
      const pageTextWidth = doc.getTextWidth(pageText);
      doc.text(
        pageText,
        pageWidth - margin - pageTextWidth,
        pageHeight - 8
      );
    }
    
      doc.save(`${filename}.pdf`);
      setPdfSuccess(true);
      setIsGeneratingPDF(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => setPdfSuccess(false), 3000);
    } catch (error) {
      console.error('PDF generation error:', error);
      setIsGeneratingPDF(false);
      alert('Une erreur est survenue lors de la génération du PDF. Veuillez réessayer.');
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="pt-24 sm:pt-28 md:pt-36 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 bg-bpd-light min-h-screen flex items-center justify-center">
        <div className="container mx-auto max-w-md">
          <div className="bg-white p-8 border border-[#E0DAD4]">
            <h1 className="text-2xl font-bold text-bpd-ink mb-6">{title}</h1>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-bpd-ink mb-2">
                  Mot de passe
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-bpd-red"
                  placeholder="Entrez le mot de passe"
                  autoFocus
                />
              </div>
              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-6 py-2 bg-bpd-red text-white font-semibold hover:bg-bpd-red-soft transition-colors"
                >
                  Accéder
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="px-6 py-2 border border-bpd-red text-bpd-red font-semibold hover:bg-bpd-red hover:text-white transition-colors"
                >
                  Retour
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    );
  }

  const hasBilingual = contentEn !== undefined;

  return (
    <main className="pt-24 sm:pt-28 md:pt-36 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 bg-bpd-paper min-h-screen">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-[22px] sm:text-[26px] lg:text-[28px] font-semibold text-bpd-ink leading-[1.35] title-border-left">
              {title}
            </h1>
            {titleEn && (
              <p className="text-[11px] sm:text-[12px] text-bpd-grey uppercase tracking-[0.05em] mt-1">
                {titleEn}
              </p>
            )}
          </div>
          <div className="flex flex-col items-end gap-2">
            <button
              onClick={handleDownloadPDF}
              disabled={isGeneratingPDF}
              className="px-4 py-2 bg-bpd-red text-white text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.1em] hover:bg-bpd-red-soft active:bg-bpd-red active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isGeneratingPDF ? 'Génération...' : 'Télécharger PDF'}
            </button>
            {pdfSuccess && (
              <p className="text-[10px] sm:text-[11px] text-green-600 font-medium">
                ✓ PDF téléchargé avec succès
              </p>
            )}
          </div>
        </div>
        
        {hasBilingual ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {/* French Column */}
            <div id="pdf-content" className="bg-white p-6 sm:p-8 border border-[#E0DAD4] space-y-5 sm:space-y-6 text-bpd-ink/80 leading-relaxed text-sm sm:text-base">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-bpd-ink mb-3 border-b border-gray-300 pb-2">
                  Français
                </h2>
              </div>
              {content}
            </div>
            {/* English Column */}
            <div id="pdf-content-en" className="bg-white p-6 sm:p-8 border border-[#E0DAD4] space-y-5 sm:space-y-6 text-bpd-ink/80 leading-relaxed text-sm sm:text-base">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-bpd-ink mb-3 border-b border-gray-300 pb-2">
                  English
                </h2>
              </div>
              {contentEn}
            </div>
          </div>
        ) : (
          <div id="pdf-content" className="bg-white p-6 sm:p-8 border border-[#E0DAD4] space-y-5 sm:space-y-6 text-bpd-ink/80 leading-relaxed text-sm sm:text-base">
            {content}
          </div>
        )}
      </div>
    </main>
  );
};

