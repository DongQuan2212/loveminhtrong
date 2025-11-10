import React, { useState, useEffect, useCallback, useRef } from 'react';
import './App.css';

import ngaydau from './assets/ngaydau.jpg';
import aocap from './assets/aocap.jpg';
import diaque from './assets/diaque.jpg';
import didanhcau from './assets/didanhcau.jpg';


export default function RomanticHeartsImproved() {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [hearts, setHearts] = useState([]);
    const [confetti, setConfetti] = useState([]);
    const [isAnimating, setIsAnimating] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [showLoveNotes, setShowLoveNotes] = useState(false);
    const [currentView, setCurrentView] = useState('home'); // home, quiz, gallery
    const audioRef = useRef(null);

    // Quiz states
    const [quizStarted, setQuizStarted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    // Gallery states
    const [photos, setPhotos] = useState([
        { id: 1, url: ngaydau, caption: 'Ngày đầu tiên gặp nhau 💕', date: '2025-11-07' },
        { id: 2, url: aocap, caption: 'Mặc áo cặp nè 🌹', date: '2025-20-07' },
        { id: 3, url: diaque, caption: 'Chuyến đi dìa quê dịp lễ 🌊', date: '2025-31-08' },
        { id: 4, url: didanhcau, caption: 'Đi đánh cầu chung đê', date: '2025-16-07' },
    ]);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const fileInputRef = useRef(null);

    const quizQuestions = [
        {
            question: "Ngày quen nhau của 2 đứa ngày mấy ?",
            options: ["11 tháng 7", "12 tháng 7", "11 tháng 6", "11 tháng 8"],
            correct: 0,
            emoji: "📅"
        },
        {
            question: "Bộ phim đầu tiên 2 đứa đi coi là gì?",
            options: ["Conan", "Cục vàng của ngoại", "Thế giới khủng long", "Doraemon"],
            correct: 2,
            emoji: "🎬"
        },
        {
            question: "Sở thích của Minh Trọng khi ngồi sau xe Đông Quân?",
            options: ["Ôm", "Mù co", "Xu đầu dé", "Thọt nách"],
            correct: 2,
            emoji: "🎮"
        },
        {
            question: "Bữa đầu gặp Minh Trọng, Đông Quân mặc áo màu gì",
            options: ["Đen", "Xám", "Trắng", "Xanh rêu"],
            correct: 1,
            emoji: "👕"
        },
        {
            question: "Điểm chung của 2 đứa là gì ?",
            options: ["Thể thao", "Sở thích", "Ngoại hình", "Tất cả các ý trên !!!"],
            correct: 3,
            emoji: "😘"
        },
        {
            question: "Sinh nhật của Bùi Lê Đông Quân ngày mấyyyy",
            options: ["22-02-2004", "12-12-2004", "12-02-2004", "22-12-2004"],
            correct: 3,
            emoji: "🌙"
        },
        {
            question: "Bộ phim hoạt hình khi Đông Quân biết Minh Trọng cũng có xem và bất ngờ :)) ",
            options: ["Thanh gươm diệt quỷ", "Học viện anh hùng", "Hunter X Hunter", "Conan"],
            correct: 2,
            emoji: "🎬"
        },
        {
            question: "Đâu là thứ trên người ĐQ mà Minh Trọng thích nhất ( cái nì là MT tự nói đó nha )",
            options: ["Khuôn mặt", "Bụng", "Tay", "Đít"],
            correct: 2,
            emoji: "🐱"
        },
        {
            question: "Điều gì làm Minh Trọng hạnh phúc nhất?",
            options: ["Được ngủ", "Ăn ngon", "Được gặp Đông Quân", "Chơi game"],
            correct: 2,
            emoji: "💖"
        },
        {
            question: "Minh Trọng có yêu Đông Quân hem ?",
            options: ["Có", "Tất nhiên là có", "Không thể không có", "Tất cả các ý trên "],
            correct: 3,
            emoji: "⭐"
        }
    ];

    // Cleanup hearts sau 4s
    useEffect(() => {
        if (hearts.length > 0) {
            const timer = setTimeout(() => {
                setHearts(prev => prev.slice(1));
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [hearts]);

    // Cleanup confetti
    useEffect(() => {
        if (confetti.length > 0) {
            const timer = setTimeout(() => {
                setConfetti([]);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [confetti]);

    const createHeartObjects = useCallback(() => {
        const newHearts = Array.from({ length: 30 }, (_, i) => ({
            id: Date.now() + i,
            left: Math.random() * 100,
            duration: Math.random() * 2 + 3,
            size: Math.random() * 30 + 30,
            delay: i * 100,
        }));
        return newHearts;
    }, []);

    const createConfetti = useCallback(() => {
        const colors = ['#ff6b6b', '#ee5a6f', '#f06292', '#ba68c8', '#9575cd'];
        const newConfetti = Array.from({ length: 50 }, (_, i) => ({
            id: Date.now() + i,
            left: Math.random() * 100,
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            duration: Math.random() * 2 + 2,
            delay: Math.random() * 500,
        }));
        return newConfetti;
    }, []);

    const playSuccessSound = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(err => console.log('Audio play failed:', err));
        }
    }, []);

    const showLove = useCallback(() => {
        const trimmedName = name.trim();
        setAttempts(prev => prev + 1);

        if (trimmedName === '') {
            setMessage('Hãy nhập tên người yêu nhé! 💖');
            setShowMessage(true);
            setIsAnimating(true);
            setTimeout(() => setIsAnimating(false), 500);
            return;
        }

        if (trimmedName.toLowerCase() === 'lê minh trọng') {
            setMessage(`🎉 Chính xác! Đông Quân yêu ${trimmedName} nhiều lắm! 💖✨`);
            setShowMessage(true);

            playSuccessSound();

            const newHearts = createHeartObjects();
            newHearts.forEach((heart, index) => {
                setTimeout(() => {
                    setHearts(prev => [...prev, heart]);
                }, heart.delay);
            });

            setConfetti(createConfetti());

            setTimeout(() => {
                setShowLoveNotes(true);
            }, 2000);

        } else {
            const hints = [
                'Sai rồi nha! 😝 Thử lại đi!',
                'Ơ ơ, chưa đúng đâu! 🤔',
                'Gần đúng rồi đó! (Không hề nào 😆)',
                'Sai bét ròiiii! 😝 Nhớ viết chữ thường nhé!'
            ];
            setMessage(hints[Math.min(attempts, hints.length - 1)]);
            setShowMessage(true);
            setIsAnimating(true);
            setTimeout(() => setIsAnimating(false), 500);
        }
    }, [name, attempts, createHeartObjects, createConfetti, playSuccessSound]);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            showLove();
        }
    };

    const handleReset = () => {
        setName('');
        setMessage('');
        setShowMessage(false);
        setHearts([]);
        setConfetti([]);
        setAttempts(0);
        setShowLoveNotes(false);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };

    // Quiz functions
    const startQuiz = () => {
        setQuizStarted(true);
        setCurrentQuestion(0);
        setScore(0);
        setQuizFinished(false);
        setSelectedAnswer(null);
    };

    const handleAnswerClick = (answerIndex) => {
        setSelectedAnswer(answerIndex);

        if (answerIndex === quizQuestions[currentQuestion].correct) {
            setScore(prev => prev + 1);
        }

        setTimeout(() => {
            if (currentQuestion < quizQuestions.length - 1) {
                setCurrentQuestion(prev => prev + 1);
                setSelectedAnswer(null);
            } else {
                setQuizFinished(true);
                if (score + (answerIndex === quizQuestions[currentQuestion].correct ? 1 : 0) === quizQuestions.length) {
                    playSuccessSound();
                    setConfetti(createConfetti());
                }
            }
        }, 1000);
    };

    const resetQuiz = () => {
        setQuizStarted(false);
        setCurrentQuestion(0);
        setScore(0);
        setQuizFinished(false);
        setSelectedAnswer(null);
    };

    // Gallery functions
    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const newPhoto = {
                    id: Date.now(),
                    url: event.target.result,
                    caption: 'Kỷ niệm mới ✨',
                    date: new Date().toISOString().split('T')[0]
                };
                setPhotos(prev => [...prev, newPhoto]);
            };
            reader.readAsDataURL(file);
        }
    };

    const deletePhoto = (photoId) => {
        setPhotos(prev => prev.filter(p => p.id !== photoId));
        setSelectedPhoto(null);
    };

    return (
        <>
            <div className="container">
                {/* Audio element */}
                <audio ref={audioRef} preload="auto">
                    <source src="https://cdn.pixabay.com/audio/2022/03/10/audio_4a2b1595ce.mp3" type="audio/mpeg" />
                </audio>

                {/* Navigation */}
                <nav className="nav-menu">
                    <button
                        className={`nav-btn ${currentView === 'home' ? 'active' : ''}`}
                        onClick={() => setCurrentView('home')}
                    >
                        🏠 Trang Chủ
                    </button>
                    <button
                        className={`nav-btn ${currentView === 'quiz' ? 'active' : ''}`}
                        onClick={() => setCurrentView('quiz')}
                    >
                        🎯 Quiz
                    </button>
                    <button
                        className={`nav-btn ${currentView === 'gallery' ? 'active' : ''}`}
                        onClick={() => setCurrentView('gallery')}
                    >
                        📸 Album
                    </button>
                </nav>

                {/* Hearts */}
                {hearts.map(heart => (
                    <div
                        key={heart.id}
                        className="heart"
                        style={{
                            left: `${heart.left}%`,
                            fontSize: `${heart.size}px`,
                            animation: `float ${heart.duration}s ease-in forwards`,
                        }}
                    >
                        ❤️
                    </div>
                ))}

                {/* Confetti */}
                {confetti.map(piece => (
                    <div
                        key={piece.id}
                        className="confetti"
                        style={{
                            left: `${piece.left}%`,
                            backgroundColor: piece.backgroundColor,
                            animation: `confettiFall ${piece.duration}s ease-in forwards`,
                            animationDelay: `${piece.delay}ms`,
                        }}
                    />
                ))}

                {/* HOME VIEW */}
                {currentView === 'home' && (
                    <div className={`card ${isAnimating ? 'shake' : ''}`}>
                        <h1 className="title">
                            💕 Người yêu của Đông Quân là ai? 💕
                        </h1>

                        <div className="input-wrapper">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Nhập tên người yêu của Đông Quân..."
                                aria-label="Nhập tên người yêu"
                                className="input-field"
                            />
                        </div>

                        <div className="button-group">
                            <button onClick={showLove} className="btn btn-primary">
                                Gửi Yêu Thương ❤️
                            </button>

                            {(name || message) && (
                                <button onClick={handleReset} className="btn btn-secondary">
                                    Thử lại 🔄
                                </button>
                            )}
                        </div>

                        <div className="hint">
                            💡 Ghi đầy đủ họ và tên, nhớ viết chữ thường nhé!
                        </div>



                        {showMessage && (
                            <div className="message slideUp">
                                {message}
                            </div>
                        )}

                        {showLoveNotes && (
                            <div className="love-notes slideUp">
                                <h3>💌 Những lý do Đông Quân yêu em:</h3>
                                <ul className="love-list">
                                    <li>✨ Minh Trọng dễ thương</li>
                                    <li>🌟 Minh Trọng nhẹ nhàng với anh, mà giờ đỡ ròi....</li>
                                    <li>💝 Chung sở thích với ĐQ nò</li>
                                </ul>
                            </div>
                        )}
                    </div>
                )}

                {/* QUIZ VIEW */}
                {currentView === 'quiz' && (
                    <div className="card quiz-card">
                        {!quizStarted ? (
                            <div className="quiz-intro">
                                <h1 className="title">🎯 Love Quiz Game</h1>
                                <p className="quiz-description">
                                    Đông Quân có hiểu Minh Trọng không?
                                    <br/>Hãy trả lời 10 câu hỏi để kiểm tra! 💕
                                </p>
                                <button onClick={startQuiz} className="btn btn-primary btn-large">
                                    Bắt Đầu Quiz 🎮
                                </button>
                            </div>
                        ) : !quizFinished ? (
                            <div className="quiz-content">
                                <div className="quiz-progress">
                                    Câu {currentQuestion + 1}/{quizQuestions.length}
                                </div>

                                <div className="quiz-emoji">
                                    {quizQuestions[currentQuestion].emoji}
                                </div>

                                <h2 className="quiz-question">
                                    {quizQuestions[currentQuestion].question}
                                </h2>

                                <div className="quiz-options">
                                    {quizQuestions[currentQuestion].options.map((option, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleAnswerClick(index)}
                                            disabled={selectedAnswer !== null}
                                            className={`quiz-option ${
                                                selectedAnswer === index
                                                    ? index === quizQuestions[currentQuestion].correct
                                                        ? 'correct'
                                                        : 'wrong'
                                                    : ''
                                            }`}
                                        >
                                            {option}
                                            {selectedAnswer === index && (
                                                index === quizQuestions[currentQuestion].correct ? ' ✅' : ' ❌'
                                            )}
                                        </button>
                                    ))}
                                </div>

                                <div className="quiz-score">
                                    Điểm: {score}/{quizQuestions.length}
                                </div>
                            </div>
                        ) : (
                            <div className="quiz-result">
                                <h2 className="result-title">
                                    {score === quizQuestions.length ? '🎉 Hoàn Hảo!' :
                                        score >= 7 ? '👏 Tuyệt Vời!' :
                                            score >= 5 ? '😊 Khá Đấy!' : '💪 Cố Gắng Lên!'}
                                </h2>

                                <div className="result-score">
                                    <div className="score-circle">
                                        <span className="score-number">{score}</span>
                                        <span className="score-total">/{quizQuestions.length}</span>
                                    </div>
                                </div>

                                <p className="result-message">
                                    {score === quizQuestions.length ?
                                        'Đông Quân hiểu Minh Trọng quá đi mất! 💖' :
                                        score >= 7 ?
                                            'Đông Quân biết khá nhiều về em rồi đó! 🌟' :
                                            score >= 5 ?
                                                'Đông Quân cần tìm hiểu em nhiều hơn nữa! 💕' :
                                                'Đông Quân cần dành nhiều thời gian hơn với em! 💝'}
                                </p>

                                <div className="button-group">
                                    <button onClick={resetQuiz} className="btn btn-primary">
                                        Chơi Lại 🔄
                                    </button>
                                    <button onClick={() => setCurrentView('home')} className="btn btn-secondary">
                                        Về Trang Chủ 🏠
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* GALLERY VIEW */}
                {currentView === 'gallery' && (
                    <div className="card gallery-card">
                        <h1 className="title">📸 Kỷ Niệm Của 2 Đứa Nè</h1>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            style={{ display: 'none' }}
                        />
                        <div className="photo-grid">
                            {photos.map(photo => (
                                <div
                                    key={photo.id}
                                    className="photo-item"
                                    onClick={() => setSelectedPhoto(photo)}
                                >
                                    <img src={photo.url} alt={photo.caption} />
                                    <div className="photo-overlay">
                                        <p className="photo-caption">{photo.caption}</p>
                                        <p className="photo-date">{photo.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {photos.length === 0 && (
                            <div className="empty-gallery">
                                <p>📷 Chưa có ảnh nào</p>
                                <p>Hãy thêm ảnh để lưu giữ kỷ niệm!</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Photo Modal */}
                {selectedPhoto && (
                    <div className="modal-overlay" onClick={() => setSelectedPhoto(null)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <button
                                className="modal-close"
                                onClick={() => setSelectedPhoto(null)}
                            >
                                ✕
                            </button>
                            <img src={selectedPhoto.url} alt={selectedPhoto.caption} />
                            <div className="modal-info">
                                <h3>{selectedPhoto.caption}</h3>
                                <p>{selectedPhoto.date}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Floating mini hearts decoration */}
                <div className="mini-hearts">
                    <span style={{ animationDelay: '0s' }}>💗</span>
                    <span style={{ animationDelay: '2s' }}>💖</span>
                    <span style={{ animationDelay: '4s' }}>💝</span>
                    <span style={{ animationDelay: '1s' }}>💕</span>
                    <span style={{ animationDelay: '3s' }}>💓</span>
                </div>
            </div>
        </>
    );
}
