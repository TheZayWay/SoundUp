# SoundUp

<img width="1280" alt="Screen Shot 2024-01-17 at 7 12 29 PM" src="https://github.com/TheZayWay/SoundUp/assets/121142977/8504f502-38a1-4318-a34a-1c31f7575f9c">


## Introduction

SoundUp is an American provider of audio streaming and media services. Discover the latest and most popular songs uploaded by SoundUp users. Enjoy ad-free music for as many hours as you desire.

Disclaimer: Not intended for commercial use or profiting from the artist's work. Solely utilized for personal development as a software developer.

### Getting Started

1. **Explore SoundUp:**
   - Visit [SoundUp](https://soundup-yjnl.onrender.com/) to experience the provided services.

2. **Create an Account:**
   - Sign up on SoundUp to upload and share your music.


<details open>
  <summary>Features</summary>
  
   [MVP Feature List](https://github.com/TheZayWay/TeeBay2/wiki/MVP-Feature-List)
</details>

## Development
<details open>
  <summary>Running SoundUp</summary>
  
   1. **Clone this repository (only this branch):**

      ```bash
      git clone -b branch_name `https://github.com/TheZayWay/TeeBay2.git`
      cd SoundUp
      ```

  2. **Install dependencies:**

      ```bash
      pipenv install -r requirements.txt
      ```

  3. **Create a `.env` file:**

      Create a **.env** file based on the example with proper settings for your development environment. Make sure the SQLite3 database connection URL is in the **.env** file.

  4. **Configure the Database Schema:**

      This starter organizes all tables inside the `flask_schema` schema, defined by the `SCHEMA` environment variable. Replace the value for `SCHEMA` with a unique name, **making sure you use the snake_case convention**.

  5. **Migrate and Seed the Database, Run the Flask App:**

      ```bash
      # Activate virtual environment
      pipenv shell

      # Migrate your database
      flask db upgrade

      # Seed your database
      flask seed all

      # Run your Flask app
      flask run
      ```
5. **Start listening!**

</details>
