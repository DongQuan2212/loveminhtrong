import React, { useState } from 'react';

export default function RomanticHearts() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const createHeart = () => {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 2 + 3) + 's';
    heart.style.fontSize = (Math.random() * 30 + 30) + 'px';
    heart.textContent = '❤️';
    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 4000);
  };

  const showLove = () => {
    const trimmedName = name.trim();

    if (trimmedName === '') {
      setMessage('Hãy nhập tên người yêu nhé! 💖');
      setShowMessage(true);
      return;
    }

    if (trimmedName.toLowerCase() === 'lê minh trọng') {
      setMessage(`Đúng rồi! Đông Quân yêu ${trimmedName} nhiều lắm! 💖`);
      setShowMessage(true);

      for (let i = 0; i < 30; i++) {
        setTimeout(() => {
          createHeart();
        }, i * 100);
      }
    } else {
      setMessage('Sai bét ròiiii 😝');
      setShowMessage(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      showLove();
    }
  };

  return (
      <>
        <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          overflow: hidden;
        }

        .heart {
          position: fixed;
          font-size: 40px;
          animation: float 4s ease-in infinite;
          pointer-events: none;
          z-index: 1;
        }

        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>

        <div style={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <div style={{
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.95)',
            padding: '50px',
            borderRadius: '30px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            maxWidth: '500px',
            width: '90%',
            position: 'relative',
            zIndex: 10,
          }}>
            <h1 style={{
              color: '#e91e63',
              marginBottom: '30px',
              fontSize: '2.5em',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
            }}>
              💕 Người yêu của Đông Quân là ai ? 💕
            </h1>

            <div style={{ marginBottom: '30px' }}>
              <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Nhập tên người yêu của Đông Quân..."
                  style={{
                    width: '100%',
                    padding: '15px',
                    fontSize: '18px',
                    border: '3px solid #e91e63',
                    borderRadius: '15px',
                    outline: 'none',
                    transition: 'all 0.3s',
                  }}
              />
            </div>

            <button
                onClick={showLove}
                style={{
                  background: 'linear-gradient(135deg, #e91e63, #f06292)',
                  color: 'white',
                  border: 'none',
                  padding: '15px 40px',
                  fontSize: '20px',
                  borderRadius: '15px',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  fontWeight: 'bold',
                  boxShadow: '0 5px 15px rgba(233, 30, 99, 0.4)',
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 8px 20px rgba(233, 30, 99, 0.6)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 5px 15px rgba(233, 30, 99, 0.4)';
                }}
            >
              Gửi Yêu Thương ❤️
            </button>

            <div style={{
              marginTop: '15px',
              color: '#666',
              fontSize: '14px',
              fontStyle: 'italic',
            }}>
              💡 Ghi đầy đủ họ và tên và nhớ viết in hoa
            </div>

            <div style={{
              marginTop: '30px',
              fontSize: '24px',
              color: '#e91e63',
              fontWeight: 'bold',
              opacity: showMessage ? 1 : 0,
              transition: 'opacity 0.5s',
              minHeight: '30px',
            }}>
              {message}
            </div>
          </div>
        </div>
      </>
  );
}
