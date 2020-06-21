class App extends React.Component {
  render() {
    return (
      React.createElement("div", { className: "container" },
      React.createElement("h1", { className: "title" }, "Markdown Previewer"),
      React.createElement("br", null),
      React.createElement("div", { className: "link" },
      React.createElement("a", { className: "button", href: "https://daringfireball.net/projects/markdown/", target: "_blank" }, "Learn about Markdown")),

      React.createElement("br", null),
      React.createElement("hr", null),
      React.createElement("br", null),
      React.createElement("br", null),
      React.createElement(Editor, null)));



  }}


class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown:

      "# h1 Heading \n\n\## h2 Heading \n\n\### h3 Heading \n\n\#### h4 Heading \n\n\##### h5 Heading \n\n\###### h6 Heading \n\n\## Horizontal Rules \n\n\___ \n\n\--- \n\n\*** \n\n\## Emphasis \n\n\**This is bold text** \n\n__This is bold text__ \n\n\*This is italic text* \n\n\_This is italic text_ \n\n\~~Strikethrough~~ \n\n\## Blockquotes \n\n\> Blockquotes can also be nested... \n\n\>> ...by using additional greater-than signs right next to each other... \n\n\> > > ...or with spaces between arrows. \n\n\## Code \n\n\Inline `code` \n\n\Indented code \n\n\    // Some comments \n\n\    line 1 of code \n\n\    line 2 of code \n\n\    line 3 of code \n\n\Block code 'fences' \n\n\``` \n\n\Sample text here... \n\n\``` \n\n\Syntax highlighting \n\n\```js \n\n\ var foo = function (bar) { \n\n\ return bar++; \n\n\ }; \n\n\console.log(foo(5)); \n\n\``` \n\n\ ## Links \n\n\ [My GitHub](https://github.com/gavischneider 'title text!') \n\n\ ## Lists \n\n\ Unordered \n\n\ + Create a list by starting a line with `+`, `-`, or `*` \n\n\ + Sub-lists are made by indenting 2 spaces: \n\n\   - Marker character change forces new list start: \n\n\    * Ac tristique libero volutpat at \n\n\     + Facilisis in pretium nisl aliquet \n\n\    - Nulla volutpat aliquam velit \n\n\ + Very easy! \n\n\ Ordered \n\n\ 1. Lorem ipsum dolor sit amet \n\n\ 2. Consectetur adipiscing elit \n\n\ 3. Integer molestie lorem at massa \n\n\ 1. You can use sequential numbers... \n\n\ 1. ...or keep all the numbers as `1.` \n\n\ ## Images \n\n\ \n\n\ ![React](https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg)" };


  }

  handleChange(event) {
    this.setState({ markdown: event.target.value }, function () {
      console.log(this.state.markdown);
    });
  }

  render() {
    return (
      React.createElement("div", null,
      React.createElement("div", { className: "row2" },
      React.createElement("div", null, React.createElement("h1", null, "Editor")),
      React.createElement("div", null, React.createElement("h1", null, "Previewer"))),


      React.createElement("div", { className: "row" },
      React.createElement("div", { className: "col1" },
      React.createElement("textarea", { id: "editor", type: "text", className: "textEditor", value: this.state.markdown, onChange: this.handleChange.bind(this) })),

      React.createElement("div", { className: "col2" },
      React.createElement(Markdown, { markdown: this.state.markdown })))));




  }}


class Markdown extends React.Component {
  changeToMarkdown() {
    return { __html: marked(this.props.markdown) };
  }

  render() {
    return (
      React.createElement("div", { className: "markdownPreview", id: "preview", dangerouslySetInnerHTML: this.changeToMarkdown() }));

  }}


React.render(React.createElement(App, null), document.getElementById('root'));