"use client"
import React, { useState, useEffect } from 'react';

const sym: string[] = ['♠', '♥', '♦', '♣'];
const num: string[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];





const shuffleDeck = (): string[] => {
    const deck: string[] = [];
    for (const symbol of sym) {

        for (const number of num) {

            deck.push(`${number}${symbol}`);
        }
    }
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));


        [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    return deck;
};
const calculateScore = (hand: string[]): number => {
    let score: number = 0;
    let aceCard: boolean = false;

    for (const card of hand) {
        if (card) {
            const sym: string = card.slice(0, -1);
            if (sym === 'A') {

                score += 11;
                aceCard = true;

            } else if (['K', 'Q', 'J'].includes(sym)) {
                score += 10;
            } else {

                score += parseInt(sym, 10);
            }
        }
    }
    if (score > 21 && aceCard) {


        score -= 10;
    }
    return score;
};


const Blackjack: React.FC = () => {
    const [deck, updateDeck] = useState<string[]>([]);
    const [playerHand, updatePlayer] = useState<string[]>([]);
    const [dealerHand, updateDealer] = useState<string[]>([]);

    const [playerScore, updatePScore] = useState<number>(0);
    const [dealerScore, updateDScore] = useState<number>(0);
    const [message, updateMessage] = useState<string>('');

    const [isGameOver, updateGame] = useState<boolean>(false);

    useEffect(() => {
        const newDeck: string[] = shuffleDeck();
        updateDeck(newDeck);


    }, []);





    useEffect(() => {
        if (playerScore > 21) {
            updateMessage('Player lost,Dealer wins');
            updateGame(true);
        }
    }, [playerScore]);



    const deal = () => {
        const newPHand: string[] = [deck.pop()!, deck.pop()!];
        const newDHand: string[] = [deck.pop()!, deck.pop()!];


        updatePlayer(newPHand);
        updateDealer(newDHand);

        updatePScore(calculateScore(newPHand));

        updateDScore(calculateScore(newDHand));
        updateGame(false);

        updateMessage('');
    };



    return (
        <div className="blackjack">
            <h1>WinWin Casino</h1>
            <h2>Blackjack</h2>
            <button onClick={deal}>Deal</button>

            <div className="sekcia">
                <div className="hand">
                    <h2>Players Hand</h2>
                    <div className="cards">

                        {playerHand.map((card, index) => (
                            <div key={index} className="card">
                                {card}
                            </div>

                        ))}
                    </div>
                    <p>Player Score: {playerScore}</p>

                </div>
                <div className="hand">
                    <h2>Dealers Hand</h2>

                    <div className="cards">
                        {dealerHand.map((card, index) => (
                            <div key={index} className="card">

                                {card}

                            </div>
                        ))}
                    </div>
                    <p>Dealer Score: {dealerScore}</p>

                </div>
            </div>


        </div>
    );
};

export default Blackjack;