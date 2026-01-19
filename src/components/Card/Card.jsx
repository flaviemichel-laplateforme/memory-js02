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
                <img className="front" src={card.src} alt={card.name} />

                {/* Ajout nom de la planète */}
                <p className='front-text'>{card.name}</p>



                {/* Face cachée (Dos) */}
                <img
                    className="back"
                    src="/images/dos.jpeg"
                    onClick={handleClick}
                    alt="card back"
                />
            </div>
        </div>
    );
}