import json, os, urllib.parse, urllib.request, re
def token():
    d = urllib.parse.urlencode({"client_id": os.environ["RIC_YT_CLIENT_ID"], "client_secret": os.environ["RIC_YT_CLIENT_SECRET"],
                                "refresh_token": os.environ["RIC_YT_REFRESH_TOKEN"], "grant_type": "refresh_token"}).encode()
    return json.load(urllib.request.urlopen("https://oauth2.googleapis.com/token", d))["access_token"]
T = token()
def get(base, **p):
    r = urllib.request.Request(base + "?" + urllib.parse.urlencode(p), headers={"Authorization": "Bearer " + T})
    try: return json.load(urllib.request.urlopen(r))
    except urllib.error.HTTPError as e: return {"error": e.code, "msg": e.read().decode()[:300]}
Y = "https://www.googleapis.com/youtube/v3/"
ch = get(Y + "channels", part="snippet,statistics,contentDetails,brandingSettings", mine="true")["items"][0]
up = ch["contentDetails"]["relatedPlaylists"]["uploads"]
ids, tok = [], None
while True:
    kw = dict(part="contentDetails", playlistId=up, maxResults=50)
    if tok: kw["pageToken"] = tok
    r = get(Y + "playlistItems", **kw); ids += [x["contentDetails"]["videoId"] for x in r["items"]]; tok = r.get("nextPageToken")
    if not tok: break
vs = []
for i in range(0, len(ids), 50):
    vs += get(Y + "videos", part="snippet,status,contentDetails,statistics,localizations", id=",".join(ids[i:i+50]))["items"]
# playlists
pls = get(Y + "playlists", part="snippet,status,contentDetails", mine="true", maxResults=50)["items"]
enpl = {}
for p in pls:
    tok = None
    while True:
        kw = dict(part="contentDetails", playlistId=p["id"], maxResults=50)
        if tok: kw["pageToken"] = tok
        r = get(Y + "playlistItems", **kw)
        for x in r.get("items", []): enpl.setdefault(x["contentDetails"]["videoId"], []).append(p["snippet"]["title"])
        tok = r.get("nextPageToken")
        if not tok: break
A = "https://youtubeanalytics.googleapis.com/v2/reports"
an = get(A, ids="channel==MINE", startDate="2026-04-01", endDate="2026-11-01", dimensions="video",
         metrics="views,estimatedMinutesWatched,averageViewDuration,averageViewPercentage,subscribersGained,likes,comments,shares",
         sort="-views", maxResults=200)
tot = get(A, ids="channel==MINE", startDate="2026-04-01", endDate="2026-11-01", metrics="views,estimatedMinutesWatched,subscribersGained,subscribersLost")
src = get(A, ids="channel==MINE", startDate="2026-10-01", endDate="2026-11-01", dimensions="insightTrafficSourceType", metrics="views,estimatedMinutesWatched", sort="-views")
srcv = {}
for v in vs:
    r = get(A, ids="channel==MINE", startDate="2026-04-01", endDate="2026-11-01", dimensions="insightTrafficSourceType", metrics="views", filters="video==" + v["id"], sort="-views")
    srcv[v["id"]] = r.get("rows", [])
cmt = {}
for v in vs:
    r = get(Y + "commentThreads", part="snippet", videoId=v["id"], maxResults=20)
    cmt[v["id"]] = [(c["snippet"]["topLevelComment"]["snippet"]["authorDisplayName"], c["snippet"]["topLevelComment"]["snippet"]["textOriginal"][:120]) for c in r.get("items", [])] if "items" in r else r
json.dump({"canal": ch, "videos": vs, "playlists": pls, "en_playlist": enpl, "analytics": an, "total": tot, "fuentes": src, "fuentes_video": srcv, "comentarios": cmt},
          open("canal_hoy.json", "w"), ensure_ascii=False, indent=1)
print(len(vs), "videos")
