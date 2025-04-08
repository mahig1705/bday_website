"use client"

import { motion } from "framer-motion"

// Sample notes - replace with actual messages from friends and family
const loveNotes = [
  {
    id: 1,
    name: "Mahi",
    message: "Happy Birthday, Vandit!You’ve been such a wonderful person not just for my sister, but for me too. The way you take care of her with so much love truly melts my heart. You’ve always been sweet, and full of joy, and our bond has only grown stronger with time. What I admire the most is the respect you’ve always shown me it genuinely means a lot. I hope we keep building this bond, hang out more, click lots of pictures, and make countless fun memories together. Have the best birthday ever you totally deserve it!",
    color: "bg-yellow-100",
  },
  {
    id: 7,
    name: "Siddh",
    message: "happy birthday! May this year bring you success in everything you do. Have a bright future(ps:with riya)!",
    color: "bg-blue-100",
  },
  {
    id: 3,
    name: "Dhir",
    message: "Happy birthday !Here’s to another year of amazing adventures, unforgettable memories, and all the happiness your heart can hold. You deserve the absolute best today and always!",
    color: "bg-green-100",
  },
  {
    id: 4,
    name:"Daksh",
    message: "Happy birthday to an incredible friend! Wishing you a day filled with laughter, love, and all your favorite things. Here's to another amazing year! Cheers to many more adventures together! Have a blast!",
    color: "bg-orange-100",
  },
  {
    id: 5,
    name: "Shubh",
    message: "happy birthday to youu vandit!on your special day, hoping that youu always come #1 in dream11, enjoy your dayy, apna shoes aur kapdo ki shopping 1 saal se pending hai😂❤️",
    color: "bg-purple-100",
  },
  {
    id: 6,
    name: "Manya",
    message: "Happy Birthday, my friend Wishing you a day filled with laughter, love, and everything that makes you smile. 🥳🎈🎁 You deserve all the good things life has to offer today and always. ❤️",
    color: "bg-pink-100",
  },
  {
    id: 2,
    name: "mitii",
    message: "Happy birthdayy vandit🥰❤️Thankyouu for being someone i can always rely on🥰Apu bhai tare mane 1000 frooti apvani cheHeres to going on double dates forever and gossiping always❤️Hoping we come out as 4 CA'sWishing the best for you humeshaaNever forget 100 pada wali storyyAlways your behna and saali🥰🙈",
    color: "bg-pink-100",
  },
  {
    id: 8,
    name: "shreni",
    message: "Happyy Happy birthday 'VANDIT THE GREAT ' naam to suna hi hoga😂❤️🥳🥳From fighting every period and fighting for 1 2 marks to becoming so good friends ,roasting partners never imagined a bond like this.Your keduu bhai and badminton ma haravanu will be always memorable!!🥹🙈-🦁nii ( DAHAD TO SUNI HI HOGI 🤣)",
    color: "bg-purple-100",
  },
  {
    id: 9,
    name: "jash",
    message: "Happy Birthday to someone who makes the class brighter 🥳May your year be packed with laughter, success, and great surprises.😍😍Keep being awesome and chasing your dreams❤️",
    color: "bg-yellow-100",
  },
  {
    id: 10,
    name: "darshi",
    message: "Those school days, especially 9th and 10th, wouldn’t have been half as fun without you. You were like a brother—you made me laugh,always,especially when Tejal miss picked me as her favourite target in maths period Your funny comebacks, those mini mark comparisons in hindi essays just to proove who is the best kavi,they still make me smile. Grateful for those memories,i had with you. May you learn the correct pronounciation of my father's name, happy birthday kubadiaa❤️🥰",
    color: "bg-green-100",
  },
  {
    id: 11,
    name: "vanshika",
    message: "Vandit oh Vandit scholar bhaiThankyou for showing me ans in semesters after me screaming 100 times You are fun and Ashwini’s miss favourite studios boyI really wish you a very happy birthday on this dayNever knew after 10e ka class we would all meet in bhailu no tempo",
    color: "bg-blue-100",
  },
  
]

export default function LoveNotes() {
  return (
    <div className="w-full h-full flex flex-col items-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-4">Love Notes</h2>
        <p className="text-lg text-purple-700">Special messages from your loved ones</p>
      </motion.div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {loveNotes.map((note, index) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`${note.color} p-6 rounded-lg shadow-md transform rotate-${Math.floor(Math.random() * 5) - 2}`}
            whileHover={{ scale: 1.03, rotate: 0 }}
          >
            <div className="font-handwriting">
              <p className="text-gray-700 mb-4">{note.message}</p>
              <p className="text-right font-medium text-gray-800">- {note.name}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

