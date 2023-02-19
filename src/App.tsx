import { Header } from './components/Header'
import { Post } from './components/Post'
import { Sidebar } from './components/Sidebar'

import './global.css'
import styles from './App.module.css'


// author: { avatar_url: "", name: "", role: ""}
// publishedAt: Date
// content: String


const posts = [
  {
    id: 1,
    author: {
      avatarUrl: "https://github.com/raphaph.png",
      name: "Raphael",
      role: "Data Analyst"
    },
    content: [
      { type: 'paragraph', content: "Fala dev," },
      { type: 'paragraph', content: "Acabei de postar um novo conteúdo. É um projeto de UX para BI." },
      { type: 'link', content: "github/raphaph" },
    ],
    publishedAt: new Date('2023-02-18')
  },
  {
    id: 2,
    author: {
      avatarUrl: "https://github.com/maykbrito.png",
      name: "Mayk Brito",
      role: "Educator @Rocketseat"
    },
    content: [
      { type: 'paragraph', content: "Fala dev," },
      { type: 'paragraph', content: "Acabei de postar um novo conteúdo. É um projeto de UX para BI." },
      { type: 'link', content: "github/maykbrito" },
    ],
    publishedAt: new Date('2023-02-18')
  }
];


export function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        
        <main>
          {posts.map(post => {
            return (
            <Post 
              key={post.id}
              author={post.author}
              content={post.content}
              publishedAt={post.publishedAt}
            />
            
            )
          })}
        </main>
      </div>
    </div>

  )
}


