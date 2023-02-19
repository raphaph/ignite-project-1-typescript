import { Avatar } from './Avatar'
import { Comment } from './Comment'
import styles from './Post.module.css'
import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'
import { ChangeEvent, EventHandler, FormEvent, InvalidEvent, useState } from 'react';
import { Target } from 'phosphor-react';

// author: { avatar_url: "", name: "", role: ""}
// publishedAt: Date
// content: String
interface Author {
    name: string;
    role: string;
    avatarUrl: string;
}

interface Content {
    type: string;
    content: string;
}

interface PostProps {
    author: Author;
    publishedAt: Date;
    content: Content[];
    };
    

export function Post({ author, publishedAt, content }:PostProps) {
    
    const publishedDateExtended = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", { // retorna uma data em formato extenso
        locale: ptBR
    })

    const publishedDateRelative = formatDistanceToNow(publishedAt, { // retorna o tempo relativo a publicação
        locale: ptBR,
        addSuffix: true,
    })


    
    // método declarativo
    const [newCommentText, setNewCommentText] = useState('') // cria uma nova state para receber o comentário

    const  [comments,newComment] = useState([]) // state que rece varios comentários

    const isNewCommentEmpty = (newCommentText.length === 0) //define se o botãos será desabilitado quando o textarea for vazia

    const [likeCount, setLikeCount] = useState(0);
    
    function handleCreateNewComment(event: FormEvent) {  // adicionar um novo cometário ao clicar em publicar
        event.preventDefault();
        
        newComment([...comments, newCommentText]); // adiciona o comentário
        setNewCommentText('') // retorna o valor da textarea ou da state a qual a textarea retorna, para vazio
    }
    
    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('')
        setNewCommentText(event.target.value) // atualiza o dado do state com a function dele para cada alteração no textarea
    }    

    function deleteComment(commentToDelete: string) { // envia para o comments o conteúdo do comentário a ser deletado a partir do comentário clicado la no filho
        // imutabilidade -> variáveis nao sofrem mutações  
        const commentsWithoutDeletedOne = comments.filter(comment => {
            return comment !== commentToDelete;// compara o comentário clicado ao de dentro do array, se for igual, a função remove
    })
        newComment(commentsWithoutDeletedOne); // atualiza o state sem o comentário excluido
    }

    function hadleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) { // função que detecta comentário invalido
        event.target.setCustomValidity("Esse camppo é obrigatório!") // após definir q o campo esta com erro, é necessario informa-lo novamente que nao esta
    }

    
    
    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar hasBorder={true} src={author.avatarUrl}/>
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>
                <time title={publishedDateExtended} dateTime={publishedAt.toISOString()}>{publishedDateRelative}</time>
            </header>
            <div className={styles.content}>
                {content.map(line => {
                    if (line.type === 'paragraph') {
                        return <p key={line.content}>{line.content}</p>
                        
                    } else if (line.type === 'link') {
                        return <p key={line.content}><a href='#'>{line.content}</a></p>
                    }
                })}
            </div>

            <form 
                onSubmit={handleCreateNewComment} 
                className={styles.contentForm}>
                <strong>Deixe seu feedback</strong>
                <textarea 
                    name="comment" 
                    placeholder='Deixe um comentário'
                    onChange={handleNewCommentChange}
                    value={newCommentText}
                    onInvalid={hadleNewCommentInvalid} // retorna um event qando o submit detect um valor invalido neste input
                    required
                    ></textarea>
                    
            <footer>
                <button type='submit' disabled={isNewCommentEmpty}>Publicar</button>
            </footer>
            </form>
            <div className={styles.commentList}>
                {comments.map(comment => {
                    return (
                        <Comment 
                            key={comment} 
                            content={comment} 
                            onDeleteComment={deleteComment} 
                        />
                    )
                })}
            </div>
        </article>
    )
}