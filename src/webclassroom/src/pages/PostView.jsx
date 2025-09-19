import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePosts } from "../contexts/PostsContext";
import { Container, Card } from "../components/UI";

export default function PostView() {
  const { id } = useParams();
  const { getPost } = usePosts();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getPost(id).then((p) => {
        setPost(p);
        setLoading(false);
      });
    }
  }, [id, getPost]);

  if (loading)
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f0f4f8, #d9e2ec)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Container>
          <Card
            style={{
              textAlign: "center",
              fontStyle: "italic",
              maxWidth: "500px",
              margin: "0 auto",
              background: "#fff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
              padding: "20px",
            }}
          >
            Carregando...
          </Card>
        </Container>
      </div>
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f0f4f8, #d9e2ec)", // MESMO FUNDO
        paddingTop: "20px",
        paddingBottom: "40px",
      }}
    >
      <Container>
        <Card
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            lineHeight: "1.6",
            background: "#fff",
            boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
            padding: "20px",
          }}
        >
          <h1 style={{ fontSize: "2rem", marginBottom: "10px" }}>{post.title}</h1>
          <small
            style={{
              display: "block",
              marginBottom: "20px",
              color: "#6b7280",
            }}
          >
            👨‍🏫 {post.author}
          </small>
          <p
            style={{
              fontSize: "1rem",
              color: "#374151",
              whiteSpace: "pre-wrap",
            }}
          >
            {post.content}
          </p>
        </Card>
      </Container>
    </div>
  );
}