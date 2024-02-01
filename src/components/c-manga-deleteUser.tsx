'use client'

import React, { useTransition } from 'react'
import { revalidatePath } from 'next/cache'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useMutation } from '@tanstack/react-query'
import { signIn, signOut, useSession } from 'next-auth/react'

import { deleteUserAccount } from '@/app/actions/user-actions'

import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from './ui/dropdown-menu'
import { ThemeToggle } from './ui/themeToggle'

type Props = {}

const DeleteUserAndToggleTheme = () => {
  const { data: session, status } = useSession()
  const {
    mutate: DeleteUser,
    isSuccess,
    isPending,
  } = useMutation({
    mutationKey: ['deleteUser'],
    mutationFn: () => deleteUserAccount(session?.user?.email as string),
    onSuccess: () => signOut(),
  })

  return (
    <div className="flex">
      <div className="nav_icon">
        {session?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <img className="z-999 w-6" src={session?.user?.image!} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col">
              <Button onClick={() => signOut()} className="my-1 text-white">
                LogOut
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="my-1 bg-red-600 text-white hover:bg-red-600/80">
                    Delete Account
                  </Button>
                </DialogTrigger>
                <DialogContent className="z-1000 sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Delete Account</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to irrevocably delete the account
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    {isSuccess ? (
                      <Button className="bg-green-600 text-white" type="submit">
                        Success
                      </Button>
                    ) : (
                      <>
                        <Button onClick={() => DeleteUser()} className="text-white" type="submit">
                          Delete
                          {isPending && <ReloadIcon className="ml-1 h-4 w-4 animate-spin" />}
                        </Button>
                      </>
                    )}
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div onClick={() => signIn()}>user</div>
        )}
      </div>
      <ThemeToggle />
    </div>
  )
}

export default DeleteUserAndToggleTheme
