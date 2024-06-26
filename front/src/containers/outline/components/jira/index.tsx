"use client"

import {ChangeEvent, useEffect, useState} from 'react'
import * as styles from "@/containers/outline/styles/jira/outlineJira.css"
import {Toast} from '@/utils/toast'
import {addJiraAPI} from '@/apis/outline/outlineAPI'
import {useParams} from 'next/navigation'
import useJiraStore from "@/stores/useJiraStore";
import useMemberStore from "@/stores/useMemberStore";
import { TextField } from '@mui/material'

function OutlineAddJira() {
    const {projectId} = useParams()
    const [isJira, setJira] = useState(false);
    const [hostInput, setHostInput] = useState<string>('');
    const [projectKeyInput, setProjectKeyInput] = useState<string>('');
    const [emailInput, setEmailInput] = useState<string>('')
    const [userKeyInput, setUserKeyInput] = useState<string>('')
    const {isConnected,jiraInfo} = useJiraStore();
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const {me, chatMembers} = useMemberStore();

    useEffect(() => {
        if(isConnected){
            setJira(true);
            setHostInput(jiraInfo.jiraHost);
            setProjectKeyInput(jiraInfo.jiraProjectKey);
            setEmailInput(jiraInfo.jiraUsername);
            setUserKeyInput(jiraInfo.jiraKey);
        }
    }, [isConnected]);
    useEffect(() => {
        chatMembers.some(member => {
            if (me && member.id === me.id) {
                setIsAdmin(member.roles?.some(data => data === 'ADMIN'));
                return true;
            }
            return false;
        });
    }, [me, chatMembers]);
    const handleToggle = () => {
        setJira(!isJira);
    };

    const changeInput = (setter: React.Dispatch<React.SetStateAction<string>>) =>
        (e: ChangeEvent<HTMLInputElement>) => {
            setter(e.target.value)
        }

    const register = () => {
        const fields = [
            {value: hostInput, message: "JIRA HOST를 입력해주세요."},
            {value: projectKeyInput, message: "Project Key를 입력해주세요."},
            {value: emailInput, message: "JIRA email을 입력해주세요."},
            {value: userKeyInput, message: "사용자 KEY값을 입력해주세요."}
        ];

        const emptyField = fields.find(field => !field.value);
        if (emptyField) {
            Toast.error(emptyField.message)
            return;
        }

        addJiraAPI(`${projectId}`, {
            host: hostInput,
            projectKey: projectKeyInput,
            username: emailInput,
            key: userKeyInput
        })
            .then(response => {
                if (response.status === 201) {
                    Toast.success('등록 완료했습니다.')
                    setHostInput('')
                    setEmailInput('')
                    setProjectKeyInput('')
                    setUserKeyInput('')
                } else Toast.error('권한을 다시 확인하세요.')
            }).catch(error => Toast.error(`등록 실패: , ${error.message}`))
    }
    
  return (
    <div>
     {isAdmin && <>
      <br /><br />
      <div className={styles.mainDiv}>
        <p>※ 선택 : Jira 추가</p>
        <div className={styles.toggleDiv}>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <div className={`${styles.toggleSwitch} ${isJira ? 'toggled' : ''}`} onClick={handleToggle}>
          <div className={styles.slider} style={{ transform: isJira ? 'translateX(30px)' : 'translateX(0)' }} />
          </div>
        </div>
      </div>
      {isJira && (
      <div>
        <div className={styles.jiraMainDiv}>
          <div className={styles.jiraSubDiv}>
            <TextField label="Jira HOST"
                       value={hostInput}
                       onChange={changeInput(setHostInput)}
            />
          </div>
          <div className={styles.jiraSubDiv}>
            <TextField label="Project Key"
                       value={projectKeyInput}
                       onChange={changeInput(setProjectKeyInput)}
            />
          </div>
          <div className={styles.jiraSubDiv}>
            <TextField label="Jira email"
                       value={emailInput}
                       onChange={changeInput(setEmailInput)}
            />
          </div>
          <div className={styles.jiraSubDiv}>
            <TextField label="사용자 KEY값"
                       value={userKeyInput}
                       onChange={changeInput(setUserKeyInput)}
            />
          </div>
        </div>
        <div>
        <button type="button" className={styles.button} onClick={register}>Jira 연동</button>
        </div>
      </div>
      )}
      </>}
    </div>
  )
}

export default OutlineAddJira;