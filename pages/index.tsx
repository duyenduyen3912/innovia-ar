import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import Homepage from '../module/home'

// import NavBar from '../components/NavBar'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      
      <Homepage />
     
    </div>
    
  )
}
