import {
  Text,
  Container,
  Stack,
  TextInput,
  Button,
  Anchor,
} from '@mantine/core'
import { Link } from 'react-router-dom'

export default function LoginPage() {
  return (
    <Container size={350}>
      <Stack spacing={'md'}>
        <Text align="center" size="xl" weight="bold">
          Sign in to EasyPhysio
        </Text>

        <TextInput label="Email" placeholder="Your email" />

        <TextInput label="Password" placeholder="Your password" />

        <Text size="xs">
          New to EasyPhysio?{' '}
          <Anchor component={Link} to={`/signup`}>
            Create an account
          </Anchor>
        </Text>

        <Button fullWidth>Sign in</Button>
      </Stack>
    </Container>
  )
}
