"use client"
import React, { useState, useEffect } from 'react';
import './black.css'
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
    const [btn, updateBtn] = useState(true);
    const [playerScore, updatePScore] = useState<number>(0);
    const [dealerScore, updateDScore] = useState<number>(0);
    const [message, updateMessage] = useState<string>('');

    const [Game, updateGame] = useState<boolean>(false);

    useEffect(() => {
        const newDeck: string[] = shuffleDeck();
        updateDeck(newDeck);


    }, []);


    const deal = () => {
        const newPHand: string[] = [deck.pop()!, deck.pop()!];
        const newDHand: string[] = [deck.pop()!, deck.pop()!];

        updateBtn(true);
        updatePlayer(newPHand);
        updateDealer(newDHand);

        updatePScore(calculateScore(newPHand));

        updateDScore(calculateScore(newDHand));
        updateGame(false);

        updateMessage('');
    };
    const hit = () => {
        if (!Game) {
            const novaPlayerHand: string[] = [...playerHand, deck.pop()!];
            updatePlayer(novaPlayerHand);
            const pNew = calculateScore(novaPlayerHand);
            updatePScore(pNew);


            if (pNew > 21) {
                updateMessage('🎆 Dealer Wins!🎆');
                updateGame(true);
            }
        } else {
            win();
        }
    };
    const stand = () => {
        if (!Game) {
            const dCards = () => {

                if (dealerScore < 17) {
                    const newD: string[] = [...dealerHand];
                    for (const card of deck) {
                        newD.push(card);
                        const newDScore = calculateScore(newD);


                        if (newDScore >= 17) {
                            updateDealer(newD);
                            updateDScore(newDScore);
                            break;
                        }
                    }
                }
                win();

            };
            dCards();

        }
    };

    const win = () => {

        if (playerScore > 21) {
            updateMessage('🎆Dealer Wins🎆');
        } else if (dealerScore > 21) {
            updateMessage('🎆Player Wins!🎆');
        } else if (playerScore === dealerScore) {
            updateMessage('🎆Its a Tie!🎆');
        } else if (playerScore <= 21 && dealerScore <= 21) {
            if (playerScore > dealerScore) {
                updateMessage('🎆Player Wins!🎆');
            } else {
                updateMessage('🎆Dealer Wins🎆');
            }
        }
        updateGame(true);

    };




    return (
        <div className="blackjack">
            <h1 className="nadpis">WinWin Casino</h1>
            <h1>🃏Blackjack🃏</h1>
            <h3>PRESS DEAL</h3>
            <button onClick={deal}>Deal</button>

            <div className="sekcia">
                <div className="hand">
                    <h2>Players Hand👶</h2>
                    <div className="cards">

                        {playerHand.map((card, index) => (
                            <div key={index} >
                                {card}
                            </div>

                        ))}
                    </div>
                    <p>Player Score: {playerScore}</p>

                </div>
                <div className="hand">
                    <h2>Dealers Hand👲</h2>

                    <div className='cards'>
                        {dealerHand.map((card, index) => (
                            <div key={index} >

                                {card}

                            </div>
                        ))}
                    </div>
                    <p>Dealer Score: {dealerScore}</p>

                </div>

                {message && <div className="sprava">{message}</div>}




            </div >

            {!Game && playerScore <= 21 && btn && (
                <div className="buttons">
                    <button onClick={hit}>Hit👊</button>
                    <button onClick={() => { stand(); updateBtn(false); }}>Stand✋</button>
                </div>
            )}

        </div >
    );
};

export default Blackjack;