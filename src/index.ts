import './styles/main.css';

// Define a simple interface for model-viewer element
interface ModelViewerElement extends HTMLElement {
  src: string;
  alt: string;
  ar: boolean;
  arModes: string;
  cameraControls: boolean;
  shadowIntensity: number;
  autoRotate: boolean;
  cameraOrbit: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': ModelViewerElement;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('TAKUMI Project WebAR Experience initialized');
  
  // Language switching functionality
  setupLanguageSwitcher();
  
  // キングのモデルビューアー
  const kingModelViewer = document.querySelector('#chess-model-king') as ModelViewerElement;
  // クイーンのモデルビューアー
  const queenModelViewer = document.querySelector('#chess-model-queen') as ModelViewerElement;
  
  // モデルビューアー初期化関数
  const initModelViewer = (modelViewer: ModelViewerElement | null, modelName: string) => {
    if (modelViewer) {
      console.log(`${modelName} model viewer found, setting up event listeners`);
      
      // モデル読み込み完了時のイベント
      modelViewer.addEventListener('load', () => {
        console.log(`${modelName} model loaded successfully`);
      });
      
      // エラー処理
      modelViewer.addEventListener('error', (event: Event) => {
        console.error(`Error loading ${modelName} model:`, event);
      });
      
      // ARモードの状態変化
      modelViewer.addEventListener('ar-status', (event: Event) => {
        const arEvent = event as any;
        console.log(`${modelName} AR Status: ${arEvent.detail?.status || 'unknown'}`);
      });
    } else {
      console.warn(`${modelName} model viewer not found in the document`);
    }
  };
  
  // 各モデルビューアーの初期化
  initModelViewer(kingModelViewer, 'King');
  initModelViewer(queenModelViewer, 'Queen');
  
  // カメラボタンの制御
  document.querySelectorAll('.camera-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLElement;
      const targetModelId = target.dataset.target;
      const orbit = target.dataset.orbit;
      
      if (orbit && targetModelId) {
        const targetModel = document.querySelector(`#${targetModelId}`) as ModelViewerElement;
        if (targetModel) {
          targetModel.cameraOrbit = orbit;
        }
      }
    });
  });
});

// Check if WebAR is supported
function checkARSupport(): void {
  if (isARSupported()) {
    console.log('WebAR is supported on this device');
    
    // Add visual indicator that AR is available
    const body = document.querySelector('body');
    if (body) {
      body.classList.add('ar-supported');
    }
  } else {
    console.log('WebAR is not available on this device');
  }
}

// Helper function to check AR support
function isARSupported(): boolean {
  // Check for WebXR
  const webXRSupported = 'xr' in navigator;
  
  // Check for iOS Quick Look
  const quickLookSupported = 
    /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()) && 
    (/apple/i.test(navigator.vendor) || /safari/i.test(navigator.userAgent.toLowerCase()));
  
  // Check for Scene Viewer (Android)
  const sceneViewerSupported = /android/i.test(navigator.userAgent);
  
  return webXRSupported || quickLookSupported || sceneViewerSupported;
}

// Run the AR support check
checkARSupport();

// Language switching functionality
function setupLanguageSwitcher() {
  const langButtons = document.querySelectorAll('.lang-btn');
  
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = (btn as HTMLElement).dataset.lang || 'ja';
      changeLanguage(lang);
      
      // Update active button
      langButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Update HTML lang attribute
      document.documentElement.lang = lang;
    });
  });
}

function changeLanguage(lang: string) {
  // Get all elements with data-{lang} attributes
  const elements = document.querySelectorAll(`[data-${lang}]`);
  
  elements.forEach(el => {
    const content = (el as HTMLElement).getAttribute(`data-${lang}`);
    if (content) {
      // For elements with HTML content
      if (content.includes('<')) {
        el.innerHTML = content;
      } else {
        // For elements with text content only
        el.textContent = content;
      }
    }
  });
  
  // Handle RTL for Arabic
  if (lang === 'ar') {
    document.body.style.direction = 'rtl';
    document.body.classList.add('rtl');
  } else {
    document.body.style.direction = 'ltr';
    document.body.classList.remove('rtl');
  }
  
  console.log(`Language changed to: ${lang}`);
}