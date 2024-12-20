#!/usr/bin/env python3

import json
import logging
import os
from datetime import date, datetime

import requests


# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class PoemPoster:
    def __init__(self, base_url="http://localhost:8080"):
        self.base_url = base_url

    def create_author(self, first_name: str, last_name: str) -> dict:
        """Create a new author in the backend"""
        url = f"{self.base_url}/api/authors"
        data = {
            "firstName": first_name,
            "lastName": last_name,
            "poems": []
        }
        logger.info(f"Creating author with data: {json.dumps(data, indent=2)}")
        response = requests.post(url, json=data)
        response.raise_for_status()
        return response.json()

    def get_all_authors(self) -> list:
        """Get all authors from the backend"""
        url = f"{self.base_url}/api/authors"
        response = requests.get(url)
        response.raise_for_status()
        return response.json()

    def create_poem(self, title: str, content: str, author_id: int, poem_date: str = None) -> dict:
        """Create a new poem in the backend"""
        if poem_date is None:
            poem_date = date.today().isoformat()

        url = f"{self.base_url}/api/poems"
        data = {
            "title": title,
            "content": content,
            "date": poem_date,
            "authorId": author_id
        }

        logger.info(f"Creating poem with data: {json.dumps(data, indent=2)}")
        response = requests.post(url, json=data)
        response.raise_for_status()
        return response.json()


def load_json_file(file_path: str) -> dict:
    """Load and parse a JSON file"""
    with open(file_path, "r", encoding="utf-8") as file:
        return json.load(file)


def main():
    # Get the directory of the current script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    authors_file = os.path.join(script_dir, "authors.json")
    poems_file = os.path.join(script_dir, "poems.json")

    poster = PoemPoster()

    try:
        authors = load_json_file(authors_file)
        poems = load_json_file(poems_file)

        logger.info("Creating authors...")
        created_authors = {}
        for author in authors:
            try:
                created_author = poster.create_author(
                    first_name=author["first_name"],
                    last_name=author["last_name"]
                )
                created_authors[author["id"]] = created_author
                logger.info(f"Created author: {author['first_name']} {author['last_name']}")
            except requests.exceptions.HTTPError as e:
                logger.error(f"Error creating author {author['first_name']} {author['last_name']}: {e}")

        logger.info("\nCreating poems...")
        for poem in poems:
            try:
                author_id = poem["author_id"]
                if author_id not in created_authors:
                    logger.warning(f"Skipping poem {poem['title']}: Author ID {author_id} not found")
                    continue

                created_poem = poster.create_poem(
                    title=poem["title"],
                    content=poem["content"],
                    author_id=created_authors[author_id]["id"],
                    poem_date=poem.get("date")
                )
                logger.info(f"Created poem: {poem['title']}")
            except requests.exceptions.HTTPError as e:
                logger.error(f"Error creating poem {poem['title']}: {e}")

        logger.info("\nFinished creating all authors and poems!")

    except FileNotFoundError as e:
        logger.error(f"Error: Could not find file - {e}")
    except json.JSONDecodeError as e:
        logger.error(f"Error: Invalid JSON format - {e}")
    except Exception as e:
        logger.error(f"An unexpected error occurred: {e}")


if __name__ == "__main__":
    main()