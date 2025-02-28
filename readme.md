> Still under development and currently offline.

### essence

Gist-based blogging system. Create gists and view them in a blog-like format at [essence.antennatower.xyz](https://essence.antennatower.xyz)

#### Demo

##### Example of a blog post (file under the essence gist)

![1](./.github/assets/1.png)

#### The result is the following blog post at `essence.antennatower.xyz/posts/<username>/<post title>`

![2](./.github/assets/2.png)

#### Usage

- Create a gist with the description `essence`
- Add files with the extension `.md` to the gist
- The files should have the following format:

> posts marked with `true {#draft}` will not be shown

```markdown
# <insert title here> {#title} -- required

# <tag1, tag2> {#tags} -- at least 1 is required

# <insert image url> to image {#thumbnail}

# <true/false> {#draft}

# <insert url to markdown file that will replace the content> {#content}

INSERT CONTENT HERE
```

- Visit [essence.antennatower.xyz](https://essence.antennatower.xyz)
- Search for username (try `antennatower` for a demo)
