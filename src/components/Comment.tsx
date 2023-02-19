import { ThumbsUp, Trash } from 'phosphor-react'
import { useState } from 'react';
import { Avatar } from './Avatar'
import styles from './Comment.module.css'

interface CommentProps {
    content: string;
    onDeleteComment: (comment: string) => void;

}


export function Comment({ content, onDeleteComment }:CommentProps) {

    function handleDeleteComment() {
         onDeleteComment(content);
    }
    
    const [likeCount, setLikeCount] = useState(0); 

    function handleLikeComment() {
        setLikeCount(likeCount + 1);
    }

    return (
        <div className={styles.comment}>
            <Avatar hasBorder={false} src="https://github.com/raphaph.png" />
            
            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                <header>
                    <div className={styles.authorAndTime}>
                        <strong>Raphael Barros</strong>
                        <time dateTime='2022-05-11 08:13:30'>Publicado há 1h</time>
                    </div>
                    <button onClick={handleDeleteComment} title="Deletar"><Trash size={20}/></button>
                </header>
                <p>{content}</p>
                </div>
                <footer>
                    <button onClick={handleLikeComment} title="Deletar comentário"><ThumbsUp size={20}/>Aplaudir <span>{likeCount}</span></button>
                </footer>
            </div>
        </div>
    )
}