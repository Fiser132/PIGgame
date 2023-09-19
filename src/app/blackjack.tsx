'use client';
import React, { useState } from 'react';
function BlackjackGame() {
    return (
        <body>
            <main>
                <h1>Black Jack</h1>
                <button className="btn--new">👾New Game👾</button>
                <table>
                    <tr>
                        <th id="phand" class="thp">
                            🤵Your Hand - <span id="your-sum"></span>
                        </th>
                    </tr>
                    <tr>
                        <td id="your-cards">

                        </td>

                    </tr>
                </table>
                <table>
                    <tr>

                        <th className="thd">
                            🎰Dealer's Hand - <span id="dealer-sum"></span>
                        </th>
                    </tr>
                    <tr>
                        <td className="dealer-cards">

                        </td>

                    </tr>
                </table>

                <p id="results"></p>
                <div className="btnstyle">
                    <button className="hit">Hit🃏</button>
                    <button className="stay">Stay🖐</button>
                </div>
            </main>

        </body>
    );
}
export default BlackjackGame;