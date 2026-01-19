import React, { useState, useEffect } from 'react';
import './App.css';

import Title from './components/Title/Title';
import Button from './components/Button/Button';
import Card from './components/Card/Card';


const cardImages = [
    { "src": "terre.png", matched: false },
    { "src": "jupiter.png", matched: false },
    { "src": "mars.png", matched: false },
    { "src": "saturne.png", matched: false },
    { "src": "soleil.png", matched: false },
    { "src": "uranus.png", matched: false },
];

function App() {
    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState(0);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [gameWon, setGameWon] = useState(false);

    //Mélanger les cartes
    const shuffleCards = () => {
        const shuffleCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0, 5)
            .map((card) => ({ ...card, id: Math.random }));

        setChoiceOne(null);
        setChoiceTwo(null);
        setCards(shuffleCards);
        setTurns(0);
        setGameWon(false);
    };

    //Gérer le choix
    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    };

    //Vérifier les correspondances
    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true);
            if (choiceOne.src === choiceTwo.src) {
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if (card.src === choiceOne.src) {
                            return { ...card, matched: true };
                        } else {
                            return card;
                        }
                    });
                });
                resetTurn();
            } else {
                setTimeout(() => resetTurn(), 1000);
            }
        }
    }, [choiceOne, choiceTwo]);

    // Vérification de la victoire (Toutes les cartes "matched")
    useEffect(() => {
        if (cards.length > 0) {
            const allMatched = cards.every(card => card.matched === true);
            if (allMatched) {
                setGameWon(true);
            }
        }
    }, [cards]);

    const resetTurn = () => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns(prevTurns => prevTurns + 1);
        setDisabled(false);
    };

    useEffect(() => {
        shuffleCards();
    }, []);

    return (
        <div className="App">
            {/* 1. Composant Title */}
            <Title />

            {/* Affichage conditionnel : Message de victoire ou Score */}
            {gameWon ? (
                <div className="victory-message">
                    <h2>Félicitations ! Vous avez gagné en {turns} tours !</h2>
                </div>
            ) : (
                <p>Tours : {turns}</p>
            )}

            {/* Grille de cartes */}
            <div className="card-grid">
                {cards.map(card => (
                    // 2. Composant Card
                    <Card
                        key={card.id}
                        card={card}
                        handleChoice={handleChoice}
                        flipped={card === choiceOne || card === choiceTwo || card.matched}
                        disabled={disabled}
                    />
                ))}
            </div>

            {/* 3. Composant Button (Generic) */}
            <Button text="Recommencer" onClick={shuffleCards} />
        </div>
    );
}

export default App;
