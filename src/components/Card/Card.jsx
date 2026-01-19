import React from 'react';
import './Card.css';

export default function Card({ card, handleChoice, flipped, disabled }) {
    const handleClick = () => {
        if (!disabled) {
            handleChoice(card);
        }
    };

    return (
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
                {/* Face visible (Image Planète) */}
                <img className="front" src={card.src} alt="card front" />

                {/* Face cachée (Dos) */}
                <img
                    className="back"
                    src="dos.png"
                    onClick={handleClick}
                    alt="card back"
                />
            </div>
        </div>
    );
}