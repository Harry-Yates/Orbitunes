# ISS Space Tunes

---

Music player that shuffles songs as the International Space Station passes through countries.

Hyper Island - If this, then that Module - Brief 2.

### :open_file_folder: The Brief:

Create a website using date() and localstorage().

### :hourglass_flowing_sand: Time spent / Deadline:

1 week.

### :dart: Goals:

- Make use of an API.
- Develop Git workflow.
- Create a media player, which can shuffle songs.
- Integrate with Spotify api to find the top song over each country.
- Include a rocket animation.
- Large vinyl on screen that will display album artwork.

### :mechanical_arm: Solution:

The concept was to use lat/long coordinates provided from the International Space Station api (Where the ISS) to pick the top track in each country the station was orbiting and play it.

### :anger: Challenges:

We figured out fairly quickly the ISS spends quite a bit of time over the Ocean (with no top tunes 😳). We were able to find a solution using ambient Ocean tracks and light-hearted comments that appear at randomly generated intervals as though someone was looking out of the station.

We intended to use the Spotify api to select the top track in each country. Due to the short deadline, we focused on pushing our MVP and chose to hard code track data in a JSON file.

Initially we struggled with local storage but were able to work through a solution.

We also faced quite a challenge with the two playlists for 'Ocean tracks' and 'Over country regular tracks' but were able to solve this in the JS.

### :man_student: Learnings:

- GitHub workflow
- BEM methodology & CSS structure
- JavaScript
- Manipulation API data
- Local Storage

### :nut_and_bolt: Upgrades for the future:

- Spotify api integration
- Link rocket to track BPM
- Improve folder structure and split code into files
- Add a dashboard with interactive elements e.g. progress bars for lat/long or stats on countries.

### :computer: Tech used in this specific repository:

- Trello
- GitHub
- HTML
- CSS
- SASS
- JavaScript
- JSON
- [Where the ISS at API](https://wheretheiss.at/w/developer)
- [LocationIQ](https://locationiq.com/)
