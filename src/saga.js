import { all, put, takeEvery } from 'redux-saga/effects'

export function* commonActionWatcher(action) {
  yield console.log('COMMON_ACTION FIRED')
  yield put({ type: '@common/TEST_ACTION' })
}

export default function* rootSaga() {
  yield all([
    takeEvery('COMMON_ACTION', commonActionWatcher),
  ])
}