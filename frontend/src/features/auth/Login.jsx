import { Text, Container, Stack, Button, Anchor, Input } from '@mantine/core'
import { Link } from 'react-router-dom'
import { Api } from '../../api/api'
import { useQuery } from 'react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function Login() {
  const [error, setError] = useState(false)

  const {
    register,
    getValues,
    formState: { errors },
  } = useForm()

  const { data, isFetching, refetch } = useQuery(
    'token',
    async () => {
      try {
        const formData = getValues()
        const res = await Api.post('/auth', {
          username: formData.username,
          password: formData.password,
        })
        setError(false)
        return res.data
      } catch (err) {
        console.log(err)
        setError(true)
      }
    },
    {
      enabled: false,
    }
  )

  console.log(data)

  return (
    <Container size={350}>
      <Stack spacing={'md'}>
        <Text align="center" size="xl" weight="bold">
          Sign in to EasyPhysio
        </Text>

        <Input
          label="Username"
          placeholder="Your username"
          {...register('username', { required: true })}
        />

        <Input
          label="Password"
          placeholder="Your password"
          type="password"
          {...register('password', { required: true })}
        />

        <Text size="xs">
          New to EasyPhysio?{' '}
          <Anchor component={Link} to={`/signup`}>
            Create an account
          </Anchor>
        </Text>

        {error ? (
          <Text align="center" color="red" size={'xs'}>
            Invalid credentials!
          </Text>
        ) : null}

        <Button loading={isFetching} onClick={refetch} fullWidth>
          Sign in
        </Button>
      </Stack>
    </Container>
  )
}
