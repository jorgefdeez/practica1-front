import { useState, useEffect } from 'react';
import { api } from './api/api'; 
import './App.css';

function App() {
  const [showPrivateImage, setShowPrivateImage] = useState<boolean>(false);

  const [wisdom, setWisdom] = useState("");
  const [lessonId, setLessonId] = useState("??");
  const [spinning, setSpinning] = useState(false);
  const [speed, setSpeed] = useState(200); 
  
  const [showShare, setShowShare] = useState(false);

useEffect(() => {
  if (!spinning) return;

  const stopTime = 1500 + Math.random() * 2000;
  const startTime = Date.now();

  const tick = async () => {
    try {
      const { data } = await api.get("/");
      const currentData = Array.isArray(data) ? data[0] : data;
      
      let fullText = currentData.wisdom || currentData.text || currentData.lesson || "...";
      
      const match = fullText.match(/^(\d+)\.\s*(.+)$/);
      
      if (match) {
        setLessonId(match[1]); 
        setWisdom(match[2]);  
      } else {
        setWisdom(fullText);
        setLessonId(currentData.id || currentData.number || Math.floor(Math.random() * 100).toString());
      }

    } catch (error) {
      console.error("Error al cargar:", error);
      setWisdom("The web server is temporary overloaded...");
    }

    const elapsed = Date.now() - startTime;

    if (elapsed < stopTime) {
      setTimeout(tick, speed);
    } else {
      setSpinning(false);
      setSpeed(200); 
      
      setShowShare(Math.random() > 0.7); 
    }
  };

  tick();
}, [spinning, speed]);

  const handleClick = () => {
    if (!spinning) {
      setSpinning(true);
      setShowShare(false); 
    } else {
      setSpeed((prev) => Math.max(40, prev - 40));
    }
  };

  return (
    <div id="app">
      <div className="private-link">
        <span className="red-text">Private Link:</span><br/>
        <div className="link-clicker" onClick={() => setShowPrivateImage(true)}>
          <img src="/broken-image-icon.92d4496e.png" alt="broken" />
          <span className="blue-link">photo_20201208_235917.jpeg</span>
        </div>
      </div>

      {showPrivateImage && (
        <div className="secret-image-overlay" onClick={() => setShowPrivateImage(false)}>
          <img src="public/pupa-private-image.5bdbbbc6.jpg" alt="Secret Pupa" style={{width: '300px', backgroundColor: 'white'}} />
          <div className="close-btn">X</div>
        </div>
      )}

      <header className="header">
        <img src="/header-image.4a423608.png" alt="Lessonalyzer" className="header-img" />
      </header>
      
      <div className="caution-tape"></div>

      <main className="main-layout">
        
        <aside className="col-left">
          <div className="korvo-ad-box">
            <img src="/korvo-ad-car-flash-desktop.68ee3696.png" className="ad-flash" alt="Buy Korvo's Car!" />
            <img src="/rainbow-arrow.01646803.gif" className="ad-arrow" alt="Arrow" />
            <div className="car-container" style={{ position: 'relative', width: '110%' }}>
              <img src="/car-sold-desktop.77eb8a85.png" className="ad-car" style={{ width: '100%' }} alt="Sold Car" />
            </div>
          </div>
        </aside>

        <section className="col-center">
          <div className="purple-button" onClick={handleClick}>
            <img src="/button-desktop.6ff93e26.png" className="purple-bg" alt="Button Background" />
            
            <div className="purple-content">
              {!wisdom && !spinning ? (
                <>
                  <span className="corner tl">click here<br/>first</span>
                  <span className="corner tr">click here<br/>first</span>
                  <span className="corner bl">click here<br/>first</span>
                  <span className="corner br">click here<br/>first</span>

                  <div className="center-text">
                    <h1>Click Here</h1>
                    <h2>To learn your lesson</h2>
                  </div>
                </>
              ) : (
                <div className="lesson-display">
                  <h2 style={{ color: '#ffff00', marginBottom: '20px' }}>Lesson #{lessonId}</h2>
                  <p style={{ color: '#ffffff', fontSize: '1.4rem' }}>{wisdom}</p>
                  
                  {!spinning && showShare && (
                    <div className="share-box" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '30px' }}>
                      <span style={{ color: '#ffff00', fontFamily: 'monospace' }}>share with your human friends</span>
                      <img src="/share-with-friends.161d506d.png" style={{ height: '30px' }} alt="arrow" />
                      <img src="/fb-logo.96f2b976.png" style={{ height: '35px' }} alt="Facebook" />
                      <img src="/twitter-logo.ebe3c4fc.png" style={{ height: '35px' }} alt="Twitter" />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        <aside className="col-right">
          <div className="family-box">
            <img src="/fam-photo.e34b51ca.png" className="fam-img" alt="Family" />
            <p className="fam-credit">* THIS SITE DESIGNED BY THE<br/>SOLAR OPPOSITES</p>
          </div>
        </aside>

      </main>

      <div className="banner-420-wrapper">
        <img src="/emoji.22bec09e.png" className="siren-icon" alt="Siren" />
        <img src="/bad-gateway.f924a563.png" className="bad-gateway-img" alt="420 Bad Gateway" />
        <img src="/pupa-coin-desktop.c108aeaf.gif" className="pupa-coin-img" alt="Pupa Coin" />
      </div>

      <div id="fire-container"></div>

      <footer className="footer-links">
        <a href="https://www.disneyplus.com" target="_blank" rel="noopener noreferrer">Terms of Service</a>
        <a href="https://www.disneyplus.com" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
        <a href="https://www.disneyplus.com" target="_blank" rel="noopener noreferrer">Your California Privacy Rights</a>
        <a href="https://www.disneyplus.com" target="_blank" rel="noopener noreferrer">About Ads</a>
      </footer>
    </div>
  );
}

export default App;