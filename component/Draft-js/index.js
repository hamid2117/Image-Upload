import React, { Component } from "react"
import { Editor } from "react-draft-wysiwyg"
import { EditorState, convertToRaw, ContentState } from "draft-js"
import htmlToDraft from "html-to-draftjs"
import { Button, TextField } from "@material-ui/core"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import draftToHtml from "draftjs-to-html"
import axios from "axios"
export default class TextEditor extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    name: "",
    subject: "",
    toUpdateName: "",
  }
  componentDidMount() {
    if (!!this.props.name) {
      this.setState({ toUpdateName: this.props.name })
      axios
        .get(
          `${process.env.REACT_APP_BackendURL}/general/getEmailTemplate/${this.props.name}`,
          {
            withCredentials: true,
          }
        )
        .then(({ data }) => {
          let blocksFromHtml = htmlToDraft(data.html)
          const { contentBlocks, entityMap } = blocksFromHtml
          const contentState = ContentState.createFromBlockArray(
            contentBlocks,
            entityMap
          )
          const editorState = EditorState.createWithContent(contentState)
          this.setState({
            name: data.name.trim(),
            subject: data.subject.trim(),
            editorState,
          })
        })
    }
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    })
  }
  handleSubjectChange = (e) => {
    this.setState({ subject: e.target.value })
  }
  handleNameChange = (e) => {
    this.setState({ name: e.target.value })
  }
  handleSubmit = async (e) => {
    e.preventDefault()
    if (this.props.type === 1) {
      await axios.post(
        `${process.env.REACT_APP_BackendURL}/general/createEmailTemplate`,
        {
          name: this.state.name.trim(),
          subject: this.state.subject.trim(),
          html: JSON.stringify(
            draftToHtml(
              convertToRaw(this.state.editorState.getCurrentContent())
            )
          ),
        },
        {
          withCredentials: true,
        }
      )
      this.props.close()
    } else {
      await axios.patch(
        `${process.env.REACT_APP_BackendURL}/general/updateEmailTemplate/${this.state.toUpdateName}`,
        {
          newName: this.state.name,
          subject: this.state.subject,
          html: JSON.stringify(
            draftToHtml(
              convertToRaw(this.state.editorState.getCurrentContent())
            )
          ),
        },
        {
          withCredentials: true,
        }
      )
      this.props.close()
    }
  }
  uploadFile = async (data) => {
    return await axios.post(
      `${process.env.REACT_APP_BackendURL}/gcp/uploadPQPhoto`,
      data
    )
  }
  uploadCallback = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new window.FileReader()
      reader.onloadend = async () => {
        const form_data = new FormData()
        form_data.append("file", file)
        const res = await this.uploadFile(form_data)
        resolve({ data: { link: res.data } })
      }
      reader.readAsDataURL(file)
    })
  }

  render() {
    const { editorState } = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <div style={{ display: "grid" }}>
          <TextField
            label="Name"
            variant="standard"
            required
            value={this.state.name}
            style={{ width: "60%", marginBottom: "10px" }}
            onChange={this.handleNameChange}
          />
          <TextField
            value={this.state.subject}
            onChange={this.handleSubjectChange}
            label="Subject"
            required
            style={{ width: "60%", marginBottom: "30px" }}
            variant="standard"
          />
        </div>
        <Editor
          editorState={editorState}
          toolbar={{
            image: {
              uploadCallback: this.uploadCallback,
              previewImage: true,
              alt: { present: true, mandatory: false },
              inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
            },
          }}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          placeholder="Start typing ......."
          onEditorStateChange={this.onEditorStateChange}
        />
        <Button type="submit" style={{ marginTop: "30px" }}>
          {this.props.type === 1 ? "create" : "edit"}
        </Button>
      </form>
    )
  }
}
