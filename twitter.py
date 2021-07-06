import tweepy, time, json, os, random, os.path
from apscheduler.schedulers.blocking import BlockingScheduler

quotes = '/root/coolbot/quotes'
lastQuote = ''

with open('prereqs.json') as pF:
    prereqs = json.load(pF)

print('Client loaded '+str(len(os.listdir(quotes)))+' quotes')

def randomQuote(): return random.choice(os.listdir(quotes))

CONSUMER_KEY = ''
CONSUMER_SECRET = ''
ACCESS_KEY = ''
ACCESS_SECRET = ''

auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
auth.set_access_token(ACCESS_KEY, ACCESS_SECRET)

bot = tweepy.API(auth)
sched = BlockingScheduler()

@sched.scheduled_job('cron', minute=0)
def makeTweet():
    global lastQuote
    print('Tweet function activated. Picking quote...')
    quote = randomQuote()

    qName = os.path.basename(quote)
    print('Function selected '+qName)

    if (quote == lastQuote):
        makeTweet()
        return

    if (qName.endswith('.txt')):
        f = open('quotes/'+quote)
        s = f.read()
        bot.update_status(s)
    elif (qName.endswith(('.png', '.jpg', '.gif', '.mp4', '.mov'))):
        fSize = os.path.getsize('quotes/'+quote)
        print('Media file size: '+str(fSize)+' bytes')
        print('Uploading media...')
        m = bot.media_upload('quotes/'+quote)
        bot.update_status(status='', media_ids=[m.media_id_string])
    elif (qName.endswith('.webm')):
        print('Unsupported file format picked. Retrying...')
        makeTweet()
        return

    lastQuote = quote
    print(qName+' set as last quote used')
    print('Tweet successfully sent. Waiting to send next tweet...')

sched.start()