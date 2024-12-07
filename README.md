# hugo-microblog Theme for Hugo



`hugo-microblog` is a minimalistic (and a bit responsive) Hugo theme that offers
a traditional blog mixed with a microblog. It also offers the ability to do
simple link posts that link to a remote page. This theme is forked from
[internet-weblog](https://github.com/jnjosh/internet-weblog) theme for Hugo

This README is modified as appropriate for this theme. But some part still
points to the README of the original theme.

The theme features a customizable bio-section and flickr-based photo stream in
it's footer, unique layouts for displaying all posts sorted by year, and support
for partials to customize style and javascript loaded.

To see more, 
[check out my blog which is rendered with this theme](https://microblog.desipenguin.com)
and see it's 
[configuration on Gitlab](https://gitlab.com/mandarvaze/microblog/-/blob/master/config.toml)

![internet-weblog showing a Micropost.](https://github.com/jnjosh/internet-weblog/blob/main/images/screenshot.png)

## Contents

- [Installation](#installation)
- [Getting started](#getting-started)
    - [Configuring Your Blog](#configuring-your-blog)
        - [Where Should Blog Post Markdown Files be Stored?](#where-should-blog-post-markdown-files-be-stored)
        - [How to Configure the Menu in the Blog's Navigation](#how-to-configure-the-menu-in-the-blogs-navigation)
        - [Defining Yourself as the Author](#defining-yourself-as-the-author)
        - [Customizing the Bio Section, 404 Page, Javascript, or Stylesheets](#customizing-the-bio-section-404-page-javascript-or-stylesheets)
        - [Creating a Link Post](#creating-a-link-post)
    - [Variables](#variables)
    - [Overrides](#overrides)
- [Contributing](#contributing)
- [3rd Party Libraries](#3rd-party-libraries)
- [License](#license)
- [Contact](#contact)

## Installation

Add following to your YAML configuration

```
[[module.imports]]
   path = "github.com/mandarvaze/hugo-microblog"
```

For more information (and example config in other formats like TOML) read the 
official 
[documentation](https://gohugo.io/hugo-modules/use-modules/#use-a-module-for-a-theme) 
for Hugo.

## Getting Started

(This section remains unchanged from the original theme)

There are a few concepts this theme employs to make a personal blog. It's
important to read this as you may not see what you expect upon launching. Since
this theme is built to be a personal blog it opts for some simplifications like
using the ["Section Menu for the Lazy Blogger"](https://gohugo.io/extras/menus/
#section-menu-for-the-lazy-blogger) option in Hugo for displaying a simple menu.
It assumes you want to call your blog posts `posts` and organizes them as such.
For example, creating a new post (or micropost) with Hugo would
require you typing:

```
  $ hugo new post/my-new-post.md

  $ hugo new microposts/quick-thought.md
```

It also assumes you want to display links to your sections of content (`posts`,
`microposts`) and display links to other pages in the menu and
requires some setup on your part. This guide will take you through the steps to
configure your blog to use the theme.

### Configuring your Blog

#### Where should blog post markdown files be stored?

Normal blog posts should be under `post` (_note that it is not a plural_) 
You'll have a customized list page sorted by year and the default list page. 
Here's an [example](https://microblog.desipenguin.com/post/)


While Microposts can have a title, it is not use and thus they are listed in
entirety (paginated) Here is an [example](https://microblog.desipenguin.com/
microposts/)

If `SummarizeMicroposts` is set to `true`, `title` is used (if present) and 
full text is NOT shown (unless text is short). Summary ends with 
`Continue Reading` link

#### How to configure the menu in the blog's navigation

As mentioned above, this theme takes a simplistic approach to menus. In fact, it doesn't really support custom menus opting to just use Hugo's `main` menu. Because it uses the ["Section Menu for the Lazy Blogger"](https://gohugo.io/extras/menus/#section-menu-for-the-lazy-blogger) you'll need to make one change to your `config.toml` file. Add **main** as the `SectionPagesMenu`.

```
SectionPagesMenu = "main"
```

Because of this, your individual posts don't need to organize themselves into menu groupings. Everything is assumed to be grouped at the top level. One exception to this is if you want to add a custom page to the root of the menu. In this case you would want to add `menu: main` to your page's Front Matter.

You can control which menu items get an RSS icon and link by adding the `RSSSections` list to your Params section of your `config.toml`:

```
[params]
   RSSSections = [ "Posts", "Microposts", "Photos" ]
```

You can then control the name and weight of these menus in your `config.toml` by adding a section for each menu item you'd like to display:

```
[[menu.main]]
   name = "Posts"
   weight = 1
   identifier = "post"
   url = "/post/"
```

If you aren't sure of how this should look, see how [jnjosh.com uses this in it's config.toml](https://github.com/jnjosh/jnjosh.com/blob/main/config.toml).

**Recommendation:** Add `SectionPagesMenu` to your `config.toml` file.
**Recommendation:** Don't set a `menu` in your post's Front Matter unless you want it to display on the navigation.
**Recommendation:** Customize the menus that get an RSS icon by adding the `RSSSections` parameter to your `config.toml` file.
**Recommendation:** Configure the menu items by adding `menu.main` sections to your `config.toml` file.

#### Defining yourself as the Author

It looks like most themes use the `author` variable to add something simple like your name. This theme uses more structured data about you and requires an `[author]` section. The details of what is affected by each property is defined below in the variables section, but you should add this section to your `config.toml`:

Add the following under `[params]` section of your config file
```
   [params.author]
      Handle = "<Your `handle`>"
      FirstName = "<Your First Name>"
      LastName = "<Your Last Name>"
      AboutPage = "<The relative or complete link to your about page>"
      Location = "<Your Location>"
      FlickrID = "<Your Flickr ID>"
```

**Recommendation:** Don't use the `author` variable, use the above
`[params.author]` section in your `config.toml`.

#### Customizing the Bio Section, 404 page, javascript, or stylesheets

There are a few entry points for you to customize built in. The most important one is the `bio.html` partial. The contents of this file are displayed in the left side of the footer. To customize this, add a `bio.html` file in your site's directory under `layouts/partials`.

More details about each of these overrides are below in the [overrides](#overrides) section.

**Recommendation:** Add a `layouts/partials/bio.html` file to your site that tells your readers about you.

#### Creating a Link Post

Sometimes you want a post that just links to another website. This can be done
by including the `externalurl` parameter on your individual post. A link post is
just a normal post under `post` that has this special parameter. For example,
on a post talking about some kickstarter project, you can add this to your
individual post's Front Matter:

```
externalurl = "http://kickstarter.com"
```

These posts are rendered slightly different with an → to signify that it is remote.

![External URL](https://github.com/jnjosh/internet-weblog/raw/main/images/linkpost.png)

### Variables

| Variable | What value? | Required |
|---|---|---|
| `title` | `internet weblog` | No. Unless you want to call your blog something else. |
| `SectionPagesMenu` | `main` | Yes. See [above](#configuring-your-blog). |
| `[params.author]` - `Handle` | A short handle to describe you. This could be your twitter handle or simply your first name. | Yes. This is used to generate the Site's Title. |
| `[params.author]` - `FirstName` | Your first name | Yes. This is used in the footer to say Hi and in other places to identify you as the author. |
| `[params.author]` - `LastName` | Your last name | Not really. It is used in some places to identify you as the author. |
| `[params.author]` - `AboutPage` | `/about` or `http://about.othersite.com` | Only if you want an about page. This is exposed to allow you to link to an external about page as well. If you have a local page it can just be something relative. |
| `[params.author]` - `Location` | `Your City` | No. If set, this is added to the Copyright in the footer so you can give some love to your hometown. |
| `[params.author]` - `FlickrID` | `Your Flickr ID` | No. The footer shows your photo stream from flickr. If you don't set it, nothing will be displayed. |
| `[params]` - `Description` | `Describe your site` | No. If set, this is added to your pages metadata. |
| `[params]` - `ShowCopyright` | `true` or `false` | No. If true, Copyright text will be added to the footer. |
| `[params]` - `RSSEnabled` | `true` or `false` | No. If true, RSS pages will be generated. |
| `[params]` - `RSSSections` | `[ "Posts", "Microposts", "Photos" ]` | If you want RSS links in the menu, yes. These strings need to be the display name of the section where you want to have an RSS icon displayed. ![rss](https://github.com/jnjosh/internet-weblog/blob/main/images/rss.png) |
| `[params]` - `RSSMicropostTitles` | `true` or `false` | No. If false, Microposts RSS feeds will not have the title in included posts. If not present or true, nothing happens. |
| `[params]` - `YearlyMicroposts` | `true` or `false` | No. If true, Microposts will have a page with a yearly grouping just like the posts.  If not present or false, the default of not having a micropost yearly grouping is applied. |
| `[params]` - `SummarizeMicroposts` | `true` or `false` | No. If true, Microposts will be summarized in the main list just like posts with a continue reading link.  If not present or false, the default of not summarizing microposts is applied. |

Here is an example `config.toml`:

```
baseurl = "http://mysite.com/"
languageCode = "en-us"
title = "internet weblog"
theme = "internet-weblog"
Paginate = 10
SectionPagesMenu = "main"

[author]
   Handle = "jnjosh"
   FirstName = "Josh"
   LastName = "Johnson"
   AboutPage = "/about"
   Location = "Durham, NC"
   FlickrID = "87151163@N00"

[params]
   Description = "This is my blog, read it and enjoy."
   ShowCopyright = true
   RSSEnabled = true
   RSSSections = [ "Posts", "Microposts", "Photos" ]

[taxonomies]
   tag = "tags"
   category = "categories"
   series = "series"

[[menu.main]]
   name = "Posts"
   weight = 1
   identifier = "posts"
   url = "/posts/"

[[menu.main]]
   name = "Microposts"
   weight = 2
   identifier = "microposts"
   url = "/microposts/"

[[menu.main]]
   name = "Photos"
   weight = 3
   identifier = "photos"
   url = "/photos/"
```

### Overrides

The theme expects you to override a few files in your blog to finalize the customization of your blog. Below is a list of the files you can override and why you'd want to. To override these, create your own version of the file under `layouts/partials`—you may need to create this directory.

| File  | Why override?  | Required |
|---|---|---|
| `bio.html` | The footer of the blog features a section about you. | Yes. Otherwise it just has default text. |
| `not_found.html` | If you want to customize the 404 not found page, you can update it here. | Probably. The default is pretty plain. |
| `custom_javascript.html` | If you need all pages to have your own custom javascript files referenced, you can do so here. | No |
| `custom_stylesheets.html` | If you need all pages to have your own custom stylesheets referenced, you can do so here. | No |
| `custom_image_handler.html` | The footer of the blog features a photo stream. If you want to customize it or use a different source, you can override this behavior. |  No |

## Contributing

Did you find a bug or have an ideas for new features? Feel free to use the issue tracker to let me know or make a pull request.


## 3rd Party Libraries

This theme makes use of the following 3rd Party Libraries.

- [lightGallery v1.2.14](http://sachinchoolur.github.io/lightGallery/) - Used in page footer to provide a gallery to view photos in the photo stream.

## License

This theme is released under MIT. For more information, please see the [License](http://jnjosh.mit-license.org).

## Contact

This is the first theme I've made for Hugo, so I'm sure I've done some things wrong or assumed too much. If you have ideas or things that should be fixed, please let me know.

- [Josh Johnson](http://jnjosh.com) [@jnjosh](http://twitter.com/jnjosh)

---

_Thanks to Steve Francia for creating Hugo!_
