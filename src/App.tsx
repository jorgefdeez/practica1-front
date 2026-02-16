import { useState } from 'react';
import { getRandomLesson } from './api/api';
import type { Lesson } from './api/api';
import './App.css';

function App() {
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPrivateImage, setShowPrivateImage] = useState<boolean>(false);

  const fetchNewLesson = async () => {
    setLoading(true);
    const data = await getRandomLesson();
    if (data) {
      setLesson(data);
    }
    setLoading(false);
  };

  const lessonText = lesson?.lesson || lesson?.text || "";

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
          <img src="/public/pupa-private-image.5bdbbbc6.jpg" alt="Secret Pupa" />
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
            <img src="/car-sold-desktop.77eb8a85.png" className="ad-car" alt="Sold Car" />
          </div>
        </aside>

        <section className="col-center">
          <div className="purple-button" onClick={fetchNewLesson}>
            <img src="/button-desktop.6ff93e26.png" className="purple-bg" alt="Button" />
            
            <div className="purple-content">
              <span className="corner tl">click here<br/>first</span>
              <span className="corner tr">click here<br/>first</span>
              <span className="corner bl">click here<br/>first</span>
              <span className="corner br">click here<br/>first</span>

              <div className="center-text">
                {loading ? (
                  <h1>Loading...</h1>
                ) : lesson ? (
                  <div className="lesson-loaded">
                    <h1 className="lesson-num">Lesson #{lesson?.id || '?'}</h1>
                    <h2 className="lesson-txt">{lessonText}</h2>
                    <div className="share-box">
                      <span>share with your human friends</span>
                      <img src="/share-with-friends.161d506d.png" className="share-arrow" alt="arrow" />
                      <img src="/fb-logo.96f2b976.png" className="social-icon" alt="Facebook" />
                      <img src="/twitter-logo.ebe3c4fc.png" className="social-icon" alt="Twitter" />
                    </div>
                  </div>
                ) : (
                  <>
                    <h1>Click Here</h1>
                    <h2>To learn your lesson</h2>
                  </>
                )}
              </div>
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

    </div>
  );
}

export default App;