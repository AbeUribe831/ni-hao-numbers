import React from 'react'
import '../component-styles/MainBoard.css'
import '../component-styles/Resources.css'
export default function Resources(props) {
    return (
        <div 
            id='resource-div'
            className='main-board' 
            style={{
                paddingTop: '3em',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'normal',
                alignItems: 'center',
                lineHeight: '25px',
                fontSize: '17px',
                fontFamily: 'sans-serif',
            }}
        >
            <div style={props.isMobile === false ? 
                {paddingLeft: '0.5em', paddingRight: '0.5em', width: '50%'} 
                :{paddingLeft: '0.5em', paddingRight: '0.5em', width: '90%'}}>
                <h3 style={{textAlign: 'center'}}>Resources</h3>
                <p>The purpose of this page is to list out the resources I am using to learn Mandarin in hopes that they will help you as well.</p>

                <h4>Chinese Numbers <a href="https://ltl-taiwan.com/chinese-numbers">(Web Link)</a></h4>
                <p>
                    This website pretty much has you covered for learning how numbers 0 to 9 trillion work, decimals, and even counting with your hand.
                </p>
                <h4>Mandarin Click <a href="https://www.youtube.com/c/MandarinClick">(Youtube Link)</a></h4>
                <p>
                    A youtube channel filled with short stories (under 5 minutes) narrated by a native speaker with pictures, pinyin, Chinese subtitles, and English subtitles as visual aids. 
                    Each video has a rating from Beginner to Intermediate based on the HSK vocabulary used.
                </p>
                <p>
                    If you only have a few minutes and you want to practice your listening comprehension as a newer Mandarin Chinese learner, this is a great channel to start with. 
                    Though the channel is fairly new, she seems to upload new videos weekly.
                </p>
                
                <h4>Little Fox Chinese - Stories & Songs for Learners <a href="https://www.youtube.com/c/MandarinClick">(Youtube Link)</a></h4>
                <p>
                    This youtube channel is filled with animated lessons aimed towards childred learning Mandarin. Their videos focus on simple everyday vocabulary, phrases, and kids stories like "Little Red Riding Hood" with pinyin and Chinese subtitles.
                </p>
                <p>
                    If you're able to get over the fact that this is a kid's youtube channel you will be greatly rewarded with seemingly endless content. 
                    Some of my prefered playlists are "Mrs. Kelly's class" and "Easy Chinese Songs & Conversations." The conversations are slow and thus easy to speak (or sing) along with.
                </p>

                <h4>Chef Wang 美食作家王刚 <a href="https://www.youtube.com/channel/UCg0m_Ah8P_MQbnn77-vYnYw">(Youtube Link)</a></h4>
                <p>
                    Chef Wang's channel is a Chinese cooking channel with Chinese and English subtitles. Many videos also have English titles and descriptions for the English speaking audience.
                </p>
                <p>
                    This channel is not explicitly a language learning channel but having English subtitles makes it more language learning friendly and a good source of Mandarin that is spoken naturally.
                </p>

                <h4>Coffee break Chinese <a href="https://open.spotify.com/show/594qQloJqkoSo6voMq85Em?si=I2eRlHIGQpinE0j2eqJ2sg&dl_branch=1">(Spotify Link)</a></h4>
                <p>
                    Audio lesson series hosted by Crystal (that's her English name) the teacher and Mark the student. Both you and Mark learn conversational words and phrases via conversations embedded into each lesson along with explinations and cultural insights from Crystal.
                </p>
                <p>
                    Since I already have spotify this is my prefered audio course whenever I'm going on a walk, driving, or doing errands. It is both good listening and speaking practice; you will have to find the characters yourself though.
                </p>

                <h4>Language Learning with Netflix <a href="https://languagelearningwithnetflix.com/">(Google Chrome Plugin Link)</a></h4>
                <p>
                    Assuming you have Netflix you can use this plugin to watch Chinese shows with pinyin, Chinese subtitles, and English translations all together.
                    The plugin keeps track of all the dialog in the show so you can press "a" to replay the start of the last bit of dialog you heard or press "d" to skip to the next bit of dialog.
                    Another feature includes putting a piece of dialog in a loop instead of having to manually rewind the same piece of dialog every time. Also you can click on a chinese character (from the subtitles) to get its individual definition. If the show is too fast then you can adjust the speed of the show as well.
                    
                </p>
                <p>
                    There is also a paid version that lets you save words and phrases from whatever show or movie you watch, I personally haven't paid for it yet. Oh and some 
                    of my own recommendations would be: Take my brother away, Pegasus, and Scissor Seven.
                </p>

                <h4>Du Chinese <a href="https://www.duchinese.net/">(App Link)</a></h4>
                <p>
                    This app contains many short stories that you can either read and/or listen to. The stories they write are rated for learners based on their 
                    level of proficiency, there are stories made for everyone from beginners to advanced learners. Many stories have multiple chapters and each chapter is no more than a few minutes read.
                </p>
                <p>
                    I really enjoy this app as a convenient source of reading and listening material. Even the stories for beginners are quite enjoyable and contain more than just "你好，你喜欢吃中国菜吗" type stories.
                    One that I enjoyed was the “I’m a cat” story where you follow a stray cat’s day to day life; for a beginner’s story, it has a good bit of conflict and will have you rooting for the cat.
                    The app is free and will provide a handful of free stories to get a feel for the app. Stories are randomly unlocked for a set period of time but I believe that the paid subscription is well worth it.
                </p>

                <h4>Chinese Skill <a href="https://www.chineseskill.com/">(App Link)</a></h4>
                <p>
                    This is essentially a Duolingo type app dedicated to Chinese. It contains a structured course around learning HSK 1-4 vocabulary through listening, speaking, and sentence forming lessons.
                    Most lessons also contain explanations on grammatical rules used in the lesson that have so far not conflicted with the textbooks I have used.
                    There are also topic based lessons like "asking for a charger" or "airport security check" that may be of use to even intermediate learners.
                </p>
                <p>
                    If you're looking for a Duolingo type of app then I believe this is the way to go, though it is not free.
                    What is free is their older "Chinese 1" and "Chinese 2" course that is not structured around the HSK 1-4 but feels similar to their main course.
                </p>

                <h4>Integrated Chinese <a href="https://www.cheng-tsui.com/browse/textbooks/integrated-chinese-third-edition/integrated-chinese-level-1-part-1-3rd-ed-textbook?id=20468">(Textbook Link)</a></h4>
                <p>
                    Call me old fashioned but I like having a textbook at the center of my study. 
                    Combined with the workbook, you are given a good amount of listening material, reading exercises, writing exercises, grammatical explanations and even sections explaining Chinese culture. 
                    For example explaining difference in vocabulary between northern and southern China, or even what 长寿面 are (noodles you give to someone for their birthday like a birthday cake; now birthday cakes are more common in cities).
                </p>

                <h4>Pleco <a href="https://www.pleco.com/">(App Link)</a></h4>
                <p>
                    This is my goto chinese dictionary app that I believe everyone should have. You can search for either the characters themselves or their definition in English.
                </p>

                <h4>Conclusion</h4>
                <p>
                    As of now my approach is to use a textbook but embrace these other resources, especially Youtube and Du chinese, so you get more exposure to the language as a whole. 
                    I feel the problem with a textbook alone is one will get good practice reading and writing but will be thoroughly lost hearing someone speak Mandarin at a normal (quite fast) speed. 
                    Not only that but in normal speech, the tones are more subtle than in slow controlled textbook conversation;
                    so even if you hear every word the speaker said, one could get lost just trying to decipher the tones or easily mix them up.  
                </p>

                <p>If there are any resources you think I should add (especially free ones), let me know! I hope this helps and keep on studying.</p>
            </div>
        </div>
    )
}