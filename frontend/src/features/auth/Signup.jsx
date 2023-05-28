import {
  Text,
  Container,
  Stack,
  TextInput,
  Button,
  Anchor,
} from '@mantine/core'
import { Link } from 'react-router-dom'

export default function Signup() {
  return (
    <Container size={350}>
      <Stack spacing={'md'}>
        <Text align="center" size="xl" weight="bold">
          Create an Account
        </Text>

        <TextInput label="First Name" placeholder="Your first name" />

        <TextInput label="Last Name" placeholder="Your last name" />

        <TextInput label="Username" placeholder="Your username" />

        <TextInput label="Email" placeholder="Your email" />

        <TextInput label="Password" placeholder="Your password" />

        <Text size="xs">
          Already have an account?{' '}
          <Anchor component={Link} to={`/login`}>
            Sign in
          </Anchor>
        </Text>

        <Button fullWidth>Sign up</Button>
      </Stack>
    </Container>
  )
}
