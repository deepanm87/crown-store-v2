import { call } from "typed-redux-saga/macro"
import { expectSaga, testSaga } from "redux-saga-test-plan"
import { throwError } from "redux-saga-test-plan/providers"

import { userSagas, onSignOutStart, onSignUpStart, onSignUpSuccess, onEmailSignInStart, onCheckUserSession, onSignInStart, onGoogleSignInStart, onSignInSuccess,
    onSignInFailure, onSignOutFailure, onSignOutSuccess, onSignUpFailure, signOut, signUp, signIn, signInWithEmail, signInWithGoogle, isUserAuthenticated, signInAfterSignUp, getSnapshotFromUserAuth
} from "../user.saga"

import { getCurrentUser, createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword, createAuthUserWithEmailAndPassword, signOutUser } from "../../../utils/firebase/firebase.utils"

import { USER_ACTION_TYPES } from ".../user.types"
import { signOutFailed, signOutSuccess, signUpSuccess, signUpFailed, signInFailed, signInSuccess } from "../user.action"

describe('user sagas', () => {
    test('userSagas', () => {
        testSaga(userSagas)
            .next()
            .all([
                call(onCheckUserSession),
                call(onGoogleSignInStart),
                call(onEmailSignInStart),
                call(onSignUpStart),
                call(onSignUpSuccess),
                call(onSignOutStart)
            ])
            .next()
            .isDone()
    })

    test('onGoogleSignInStart saga should take latest GOOGLE_SIGN_IN_START and call signInWithGoogle', () => {
        testSaga(onGoogleSignInStart)
        .next()
        .takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
        .next()
        .isDone()
    })

    test('onCheckUserSession saga should take latest CHECK_USER_SESSION and call isUserAuthenticated', () => {
        testSaga(onCheckUserSession)
        .next()
        .takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
        .next()
        .isDone()
    })

    test('onEmailSignInStart saga should take latest EMAIL_SIGN_IN_START and call signInWithEmail', () => {
        testSaga(onEmailSignInStart)
        .next()
        .takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail)
        .next()
        .isDone()
    })

    test('onSignUpStart saga should take latest SIGN_UP_START and call signUp', () => {
        testSaga(onSignUpStart)
        .next()
        .takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp)
        .next()
        .isDone()
    })

    test('onSignUpSuccess saga should take latest SIGN_UP_SUCCESS and call signInAfterSignUp', () => {
        testSaga(onSignUpSuccess)
        .next()
        .takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp)
        .next()
        .isDone()
    })

    test('onSignOutStart saga should take latest SIGN_OUT_START and call signOut', () => {
        testSaga(onSignOutStart)
        .next()
        .isDone()
    })

    test('signInAfterSignUp saga should call getSnapshotFromUserAuth and signIn', () => {
        const mockUser = { id: 1, name: 'test' }
        const mockAdditionalDetails = { displayName: 'test' }
        const mockPayload = {
            user: mockUser,
            additionalDetails: mockAdditionalDetails
        }

        testSaga(signInAfterSignUp, {
            payload: mockPayload
        })
        .next()
        .call(getSnapshotFromUserAuth, mockUser, mockAdditionalDetails)
        .next()
        .isDone()
    })

    test('signOut saga success path should call signOutUser and put signOutSuccess if successful', () => {
        return expectSaga(signOut)
            .provide([[call(signOutUser)]])
            .put(signOutSuccess())
            .run()
    })

    test('signUp saga success path should call signInAfterSignUp and put signUpSuccess if successful', () => {
        const mockEmail = 'test@test'
        const mockPassword = 'test1234'
        const mockDisplayName = 'test'
        const mockUser = { displayName: mockDisplayName, email: mockEmail }
        const mockUserCredential = { id: 1, user: mockUser }

        const mockPayload = {
            email: mockEmail,
            password: mockPassword,
            displayName: mockDisplayName
        }

        return expectSaga(signUp, { payload: mockPayload })
            .provide([[call(createAuthUserWithEmailAndPassword, mockEmail, mockPassword), mockUserCredential]])
            .put(signUpSuccess(mockUserCredential.user, { displayName: mockDisplayName }))
            .run()
    })

    test('signUp saga error path should call createAuthUserWithEmailAndPassword and put signUpFailure if failed', () => {
        const mockEmail = 'test@test'
        const mockPassword = 'test1234'
        const mockError = new Error('test Error')

        return expectSaga(signUp, {
            payload: { email: mockEmail, password: mockPassword },
        })
            .provide([[call(createAuthUserWithEmailAndPassword, mockEmail, mockPassword), throwError(mockError)]])
            .put(signUpFailed(mockError))
            .run()
    })

    test('isUserAuthenticated saga success path should call getSnapshotFromUserAuth and signIn if successful', () => {
        const mockUserAuth = { id: 1, name: 'test' }
        return expectSaga(isUserAuthenticated)
            .provide([[call(getCurrentUser), mockUserAuth]])
                .call(getSnapshotFromUserAuth, mockUserAuth)
                .run()
    })

    test('isUserAuthenticated saga error path should call getCurrentUser and put signInFailed if failed', () => {
        const mockError = new Error('test error')

        return expectSaga(isUserAuthenticated)
            .provide([[call(getCurrentUser), throwError(mockError)]])
            .run()
    })

    test('signInWithEmail saga success path should call signInAuthUserWithEmailAndPassword and call getSnapshotFromUserAuth', () => {
        const mockEmail = 'test@test'
        const mockPassword = 'test1234'
        const mockUser = { id: 1, name: 'test', email: mockEmail }
        const mockUserCredential = { id: 1, user: mockUser }

        return expectSaga(signInWithEmail, {
            payload: { email: mockEmail, password: mockPassword }
        })
            .provide([[call(signInAuthUserWithEmailAndPassword, mockEmail, mockPassword, mockUserCredential)]])
            .call(getSnapshotFromUserAuth, mockUser)
            .run()
    })

    test('signInWithEmail saga error path should call signInAuthUserWithEmailAndPassword and put a signInFailed on error', () => {
        const mockEmail = 'test@test'
        const mockPassword = 'test1234'
        const mockError = new Error('test Error')

        return expectSaga(signInWithEmail, {
            payload: { email: mockEmail, password: mockPassword }
        })
            .provide([[call(signInAuthUserWithEmailAndPassword, mockEmail, mockPassword), throwError(mockError)]])
            .put(signInFailed(mockError))
            .run()
    })

    test('signInWithGoogle saga success path should call signInWithGooglePopup and call getSnapshotFromUserAuth', () => {
        const mockUser = { id: 1, name: 'test' }
        const mockGoogleVal = { user: mockUser }

        return expectSaga(signInWithGoogle)
            .provide([[call(signInWithGooglePopup), mockGoogleVal]])
            .call(getSnapshotFromUserAuth, mockUser)
            .run()
    })

    test('getSnapshotFromUserAuth saga should call createUserDocumentFromAuth and put signInSuccess', () => {
        const mockUserAuth = { id: 1, name: 'test' }
        const mockAdditionalDetails = { displayName: 'test' }
        const mockUserSnapshot = { id: 2, data: () => ({ displayName: 'test' })}

        return expectSaga(
            getSnapshotFromUserAuth, mockUserAuth, mockAdditionalDetails
        )
            .provide([[call(createUserDocumentFromAuth, mockUserAuth, mockAdditionalDetails), mockUserSnapshot]])
                .put(signInSuccess( { id: mockUserSnapshot.id, ...mockUserSnapshot.data() }))
                .run()
    })

    test('getSnapshotFromUserAuth saga error path should put signInFailed on Error', () => {
        const mockUserAuth = { id: 1, name: 'test' }
        const mockAdditionalDetails = { displayName: 'test' }
        const mockError = new Error('test Error')

        return expectSaga(getSnapshotFromUserAuth, mockUserAuth, mockAdditionalDetails)
            .provide([[call(createUserDocumentFromAuth, mockUserAuth, mockAdditionalDetails), throwError(mockError)]])
            .put(signInFailed(mockError))
            .run()
    })





})