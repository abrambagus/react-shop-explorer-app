import { Box, Container, Typography, Button, Paper } from '@mui/material'
import { ShoppingBag } from '@mui/icons-material'

function App() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4 }}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <ShoppingBag sx={{ fontSize: 60, color: 'primary.main' }} />
          </Box>
          <Typography variant="h2" component="h1" gutterBottom color="primary">
            Shop Explorer
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Welcome to your new React application with Material UI, Zustand, and TanStack Query.
          </Typography>
          <Button variant="contained" size="large" onClick={() => alert('Ready to build!')}>
            Start Building
          </Button>
        </Paper>
      </Container>
    </Box>
  )
}

export default App
