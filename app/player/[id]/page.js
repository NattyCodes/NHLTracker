import Image from 'next/image';
import React from 'react';
import "../../../styles/globals.css";
import styles from "../../../styles/Player.module.css";

const player = async ({params}) => {
    const res = await fetch(`https://api-web.nhle.com/v1/player/${params.id}/landing`);
    const playerInfo = await res.json();
    return (
        <div className={styles.container}>
            <div className={styles.header_img_container}>
                <Image src={playerInfo.heroImage} width={0} height={0} alt={`${playerInfo.firstName.default} ${playerInfo.lastName.default}`} sizes="50vw" style={{ width: '100%', height: '70vh'}}></Image>
                <h1 className={styles.centered}>{playerInfo.firstName.default} {playerInfo.lastName.default}</h1>
            </div>
        </div>
    )
}

export default player;