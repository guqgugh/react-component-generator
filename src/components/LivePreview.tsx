import { useState } from 'react';
import { LiveProvider, LivePreview as ReactLivePreview, LiveError } from 'react-live';

interface LivePreviewProps {
  code: string;
}

type ViewMode = 'mobile' | 'tablet' | 'desktop';

const VIEW_MODES: Array<{ mode: ViewMode; icon: string; label: string }> = [
  { mode: 'mobile', icon: '📱', label: '모바일 뷰' },
  { mode: 'tablet', icon: '📱', label: '태블릿 뷰' },
  { mode: 'desktop', icon: '💻', label: '데스크톱 뷰' },
];

export function LivePreview({ code }: LivePreviewProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('desktop');

  return (
    <div className="preview-panel">
      <div className="panel-header">
        <h3>미리보기</h3>
        <div className="view-mode-buttons">
          {VIEW_MODES.map(({ mode, icon, label }) => (
            <button
              key={mode}
              className={`btn-view-mode ${viewMode === mode ? 'active' : ''}`}
              onClick={() => setViewMode(mode)}
              title={label}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>
      <div className="preview-content">
        <LiveProvider code={code} noInline>
          <div className={`preview-render preview-${viewMode}`}>
            <ReactLivePreview />
          </div>
          <LiveError className="preview-error" />
        </LiveProvider>
      </div>
    </div>
  );
}
