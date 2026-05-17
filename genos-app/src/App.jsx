import React, { useState, useEffect, useRef } from 'react';
import {
  LayoutDashboard, Database, Settings, Cpu, Activity, HardDrive, Server, Plus, Search,
  FileText, CheckCircle, AlertCircle, ChevronRight, ChevronDown, Bot, MoreVertical, X,
  Send, Paperclip, RefreshCw, Box, Layers, Code, Zap, BarChart2, Shield, Briefcase,
  Users, Grid, Play, Pause, Terminal, Save, Trash2, UploadCloud, List, ToggleLeft,
  ToggleRight, Clock, CheckSquare, PieChart, ArrowUpRight, Globe, Lock, Download,
  Eye, Check, XCircle, Filter, Power, RotateCcw, Cloud, Wrench, Home, Bell,
  Columns, Monitor, FolderOpen, Hash, Copy, ExternalLink, BookOpen, MessageSquare,
  FileBarChart, Table2, UserCog, Image as ImageIcon, Sparkles, GitBranch, CircleDot,
  Workflow, ArrowRight, Gauge, Package, Unplug, History, TestTube2, SlidersHorizontal,
  TrendingUp, ThumbsUp, ThumbsDown, Edit3, Megaphone, FolderTree, KeyRound, UserPlus,
  AlertTriangle, Link2, Star, Mic, ArrowUp, Wand2, Compass, Languages, Mail, NotebookPen,
  PenLine, FileSpreadsheet, BarChart3, LineChart, MoreHorizontal, ArrowLeft, Bookmark,
  Pin, PinOff, Smile, Volume2, Maximize2, PanelLeftClose, PanelRightClose, Camera
} from 'lucide-react';

// ==================== MOCK DATA ====================
const MOCK_GPU_NODES = [
  { id:'node-01',name:'genos-ai-01',model:'NVIDIA H200 NVL',count:4,memory:'141GB',
    gpus:[{id:0,util:82,memUtil:65,temp:72,power:650},{id:1,util:78,memUtil:62,temp:70,power:640},{id:2,util:95,memUtil:88,temp:78,power:680},{id:3,util:45,memUtil:30,temp:55,power:320}]},
  { id:'node-02',name:'genos-ai-02',model:'NVIDIA H200 NVL',count:4,memory:'141GB',
    gpus:[{id:0,util:12,memUtil:10,temp:45,power:210},{id:1,util:5,memUtil:8,temp:42,power:190},{id:2,util:0,memUtil:2,temp:38,power:150},{id:3,util:0,memUtil:2,temp:38,power:150}]},
  { id:'node-03',name:'genos-db-01',model:'NVIDIA L40S',count:4,memory:'48GB',
    gpus:[{id:0,util:32,memUtil:45,temp:58,power:210},{id:1,util:28,memUtil:40,temp:56,power:190},{id:2,util:15,memUtil:20,temp:45,power:120},{id:3,util:10,memUtil:15,temp:42,power:110}]},
];

const MOCK_EMBEDDING_JOBS = [
  {id:950,name:'임베딩 학습 테스트',plan:'-',creator:'김세는',dept:'소프트웨어',date:'2025-10-27 14:51:32',gpu:'학습용 임시 1/8',tbStatus:'실행 중',status:'학습 완료'},
  {id:910,name:'임베딩 학습 12345',plan:'-',creator:'이세는',dept:'개발',date:'2025-08-28 22:35:46',gpu:'학습을 임시 1/8',tbStatus:'실행 중',status:'학습 완료'},
  {id:895,name:'임베딩 학습 23456',plan:'-',creator:'박세는',dept:'개발',date:'2025-08-19 19:59:20',gpu:'QA training 2 1/2',tbStatus:'중지됨',status:'취소됨'},
  {id:874,name:'임베딩 학습 34567',plan:'-',creator:'최세는',dept:'개발',date:'2025-08-19 19:40:26',gpu:'QA training 2 1/2',tbStatus:'중지됨',status:'학습 완료'},
  {id:856,name:'임베딩 학습 45689',plan:'-',creator:'전세는',dept:'개발',date:'2025-08-19 12:00:38',gpu:'QA training 1/1',tbStatus:'중지됨',status:'학습 완료'},
  {id:853,name:'567890',plan:'-',creator:'주세는',dept:'개발',date:'2025-08-19 11:37:59',gpu:'QA training 1/1',tbStatus:'중지됨',status:'오류 발생'},
  {id:847,name:'중지 테스트',plan:'-',creator:'고세는',dept:'기획',date:'2025-08-18 21:42:03',gpu:'QA training 2 1/2',tbStatus:'중지됨',status:'대기 중'},
  {id:844,name:'임베딩 학습 54321',plan:'-',creator:'현세는',dept:'사업개발',date:'2025-08-18 20:58:53',gpu:'QA training 2 1/2',tbStatus:'중지됨',status:'오류 발생'},
  {id:838,name:'임베딩 학습 98765',plan:'-',creator:'정세는',dept:'연구',date:'2025-08-18 20:46:38',gpu:'QA training 2 1/2',tbStatus:'중지됨',status:'오류 발생'},
];

const MOCK_MCP_TOOLS = [
  {id:162,name:'Search',desc:'',creator:'김세는',dept:'기획',date:'2025-10-29 22:06:28'},
  {id:159,name:'Web Search',desc:'검색 분야 설정 + 검색 분량 설정 추가',creator:'이세는',dept:'AI Engineer',date:'2025-10-23 10:59:32'},
  {id:158,name:'Web Crawler',desc:'웹 크롤링',creator:'최세는',dept:'Test',date:'2025-10-21 18:36:52'},
  {id:155,name:'Dynamic SearchFilter',desc:'Test',creator:'박세는',dept:'AI Engineer',date:'2025-10-20 15:27:50'},
  {id:153,name:'Dynamic Filter',desc:'Test',creator:'장세는',dept:'Test',date:'2025-10-17 18:01:51'},
  {id:151,name:'CodeDev',desc:'상세 설명',creator:'전세는',dept:'사업개발',date:'2025-09-26 14:28:00'},
  {id:150,name:'Code_tmp',desc:'상세 설명',creator:'최세는',dept:'사업개발',date:'2025-09-24 16:24:45'},
  {id:148,name:'SearchFilter',desc:'',creator:'이세는',dept:'AI Engineer',date:'2025-09-18 17:56:05'},
  {id:146,name:'tmp',desc:'',creator:'전세는',dept:'기획',date:'2025-09-12 16:17:30'},
  {id:145,name:'Normality_Test',desc:'정규성 검정',creator:'이세는',dept:'AI Engineer',date:'2025-09-12 14:46:54'},
];

const MOCK_MODELS = [
  {id:'gpt-oss',name:'GPT-OSS-120B',param:'120B',context:'128K',quant:'None (FP16)',status:'Running',loaded:'Node-01'},
  {id:'llama-3',name:'Llama-3-Kor-Instruct',param:'70B',context:'8K',quant:'AWQ-4bit',status:'Running',loaded:'Node-01'},
  {id:'exaone',name:'EXAONE-3.0-7.8B',param:'7.8B',context:'32K',quant:'FP16',status:'Running',loaded:'Node-02'},
  {id:'gemma',name:'Gemma-2-9B-It',param:'9B',context:'8K',quant:'GGUF-Q8',status:'Stopped',loaded:'-'},
  {id:'solar',name:'Solar-10.7B-v1.0',param:'10.7B',context:'4K',quant:'GGUF-Q5',status:'Running',loaded:'Node-02'},
];

const MOCK_PROMPTS = [
  {id:385,name:'[전용] 나만의 RAG',desc:'전용 채팅 기능(나만의 RAG3)',dept:'QA',date:'2025-10-29 10:41:12'},
  {id:384,name:'RAG 프롬프트 테스트',desc:'',dept:'AI Engineer',date:'2025-10-27 10:54:11'},
  {id:383,name:'[전용] 나만의 RAG',desc:'전용 채팅 기능(나만의 RAG)',dept:'QA',date:'2025-10-22 14:10:12'},
  {id:382,name:'[TEST] 테스트',desc:'',dept:'AI Engineer',date:'2025-10-22 04:30:28'},
  {id:381,name:'IT 프로젝트 교육용 프롬프트',desc:'IT 프로젝트 교육용 자료',dept:'AI Engineer',date:'2025-10-22 04:27:45'},
  {id:380,name:'[전용] pdf 뷰어 테스트',desc:'전용 채팅 기능(pdf 뷰어 테스트)',dept:'AI Engineer',date:'2025-10-20 18:30:11'},
  {id:378,name:'[전용] 생성 동작 확인',desc:'전용 채팅 기능 (생성 동작 확인)',dept:'QA',date:'2025-10-13 18:11:50'},
];

const MOCK_CHAT_APPS = [
  {id:1663,name:'',type:'',status:'',deploy:'',creator:'',dept:'QA',addr:''},
  {id:1662,name:'',type:'',status:'',deploy:'',creator:'',dept:'엔지니어',addr:''},
  {id:1661,name:'',type:'',status:'',deploy:'',creator:'',dept:'AI Engineer',addr:''},
  {id:1656,name:'',type:'',status:'',deploy:'',creator:'',dept:'AI Engineer',addr:''},
  {id:1655,name:'',type:'',status:'',deploy:'',creator:'',dept:'AI Engineer',addr:''},
  {id:1650,name:'',type:'',status:'',deploy:'',creator:'',dept:'AI Engineer',addr:''},
  {id:1649,name:'',type:'',status:'',deploy:'',creator:'',dept:'QA',addr:''},
  {id:1645,name:'리모트 RAG 채팅',type:'전용 채팅',status:'Offline',deploy:'배포중지',creator:'장세는',dept:'QA',addr:''},
  {id:1643,name:'고객언어 전처리기 test',type:'전용 채팅',status:'Online',deploy:'배포',creator:'김세는',dept:'AI Engineer',addr:''},
  {id:1640,name:'이미지 생성+통사지',type:'전용 채팅',status:'Online',deploy:'배포',creator:'이세는',dept:'AI Engineer',addr:''},
];

const MOCK_NODES = [
  {name:'genos01',instance:'192.123.12.123:1234',os:'Linux',version:'X (Core)',release:'3.10.0-1234.12.1.el1.x86_64',cpu:0.28,mem:4.6},
  {name:'genos02',instance:'192.123.12.123:1234',os:'Linux',version:'X (Core)',release:'3.10.0-1234.12.1.el1.x86_64',cpu:13.0,mem:43.2},
  {name:'genos03',instance:'192.123.12.123:1234',os:'Linux',version:'X (Core)',release:'3.10.0-1234.12.1.el1.x86_64',cpu:4.69,mem:18.4},
];

const MOCK_GUARDRAIL_LOGS = [
  {id:1,time:'2026-02-10 11:23:45',user:'김직원',query:'회사 기밀정보 알려줘',rule:'기밀정보 요청',action:'차단'},
  {id:2,time:'2026-02-10 10:15:22',user:'이대리',query:'경쟁사 비밀 분석해줘',rule:'경쟁정보 수집',action:'차단'},
  {id:3,time:'2026-02-09 16:42:11',user:'박과장',query:'직원 급여 전체 목록',rule:'개인정보 접근',action:'차단'},
  {id:4,time:'2026-02-09 14:30:05',user:'최사원',query:'보안 시스템 우회 방법',rule:'보안 우회 시도',action:'차단'},
  {id:5,time:'2026-02-08 09:12:33',user:'정대리',query:'퇴직자 연락처 전체',rule:'개인정보 접근',action:'경고'},
];

const MOCK_CODESPACES = [
  {id:1,name:'llm-finetune-env',image:'pytorch/pytorch:2.1-cuda12.1',status:'Running',gpu:'H200 x1',created:'2026-02-10'},
  {id:2,name:'rag-pipeline-dev',image:'python:3.11-slim',status:'Running',gpu:'-',created:'2026-02-08'},
  {id:3,name:'embedding-research',image:'nvidia/cuda:12.2-devel',status:'Stopped',gpu:'L40S x1',created:'2026-02-05'},
  {id:4,name:'agent-builder-test',image:'node:20-alpine',status:'Running',gpu:'-',created:'2026-01-28'},
];

const MOCK_VOLUMES = [
  {name:'shared-models',size:'2.4 TB',mount:'/mnt/models',usedBy:'llm-finetune-env, rag-pipeline-dev',status:'Healthy'},
  {name:'dataset-store',size:'800 GB',mount:'/mnt/datasets',usedBy:'embedding-research',status:'Healthy'},
  {name:'vector-db-backup',size:'120 GB',mount:'/mnt/backup/vectordb',usedBy:'System',status:'Healthy'},
  {name:'logs-archive',size:'50 GB',mount:'/mnt/logs',usedBy:'All',status:'Warning'},
];

// ==================== ADMIN MOCK DATA ====================
const MOCK_USERS = [
  {id:'USR-001',name:'김영빈',dept:'AI활용 초혁신 추진반',role:'시스템관리자',email:'kim@kogas.or.kr',status:'Running',lastLogin:'2026-02-14 09:10',loginCount:342,apiCalls:1580},
  {id:'USR-002',name:'이준호',dept:'기술안전팀',role:'부서관리자',email:'lee@kogas.or.kr',status:'Running',lastLogin:'2026-02-14 08:45',loginCount:280,apiCalls:920},
  {id:'USR-003',name:'박지현',dept:'경영지원팀',role:'일반사용자',email:'park@kogas.or.kr',status:'Running',lastLogin:'2026-02-13 17:30',loginCount:156,apiCalls:430},
  {id:'USR-004',name:'최민수',dept:'법무팀',role:'일반사용자',email:'choi@kogas.or.kr',status:'Running',lastLogin:'2026-02-14 07:20',loginCount:98,apiCalls:210},
  {id:'USR-005',name:'장영수',dept:'시설관리팀',role:'부서관리자',email:'jang@kogas.or.kr',status:'Stopped',lastLogin:'2026-02-10 14:00',loginCount:45,apiCalls:80},
  {id:'USR-006',name:'전하늘',dept:'교육훈련팀',role:'일반사용자',email:'jeon@kogas.or.kr',status:'Running',lastLogin:'2026-02-13 16:55',loginCount:201,apiCalls:560},
  {id:'USR-007',name:'고성민',dept:'안전관리처',role:'부서관리자',email:'ko@kogas.or.kr',status:'Running',lastLogin:'2026-02-14 08:00',loginCount:310,apiCalls:1200},
  {id:'USR-008',name:'한서윤',dept:'정보기술팀',role:'시스템관리자',email:'han@kogas.or.kr',status:'Running',lastLogin:'2026-02-14 09:05',loginCount:450,apiCalls:2100},
];

const MOCK_PERMISSION_REQUESTS = [
  {id:'PRM-001',user:'박지현',dept:'경영지원팀',type:'지식영역 접근',target:'안전규정 DB',status:'대기 중',date:'2026-02-13'},
  {id:'PRM-002',user:'최민수',dept:'법무팀',type:'API 키 발급',target:'GPT-OSS-120B',status:'대기 중',date:'2026-02-12'},
  {id:'PRM-003',user:'장영수',dept:'시설관리팀',type:'에이전트 배포',target:'시설물 점검 보고서 생성기',status:'완료',date:'2026-02-11'},
  {id:'PRM-004',user:'전하늘',dept:'교육훈련팀',type:'데이터셋 접근',target:'Safety_Regulations_QA_v1',status:'완료',date:'2026-02-10'},
];

const MOCK_KNOWLEDGE_AREAS = [
  {id:'KA-001',name:'안전규정',desc:'사내 안전규정 및 매뉴얼',docs:245,chunks:12400,size:'1.2 GB',owner:'안전관리처',access:['AI연구소','기술안전팀','안전관리처'],updated:'2026-02-12',status:'Running'},
  {id:'KA-002',name:'설비 유지보수',desc:'가스 설비 점검 및 유지보수 문서',docs:180,chunks:9200,size:'850 MB',owner:'시설관리팀',access:['기술안전팀','시설관리팀'],updated:'2026-02-10',status:'Running'},
  {id:'KA-003',name:'인사규정',desc:'복리후생, 급여, 인사 관련 규정',docs:120,chunks:6100,size:'320 MB',owner:'경영지원팀',access:['전체'],updated:'2026-02-08',status:'Running'},
  {id:'KA-004',name:'법률/계약',desc:'계약서 템플릿 및 법률 자문 문서',docs:95,chunks:4800,size:'450 MB',owner:'법무팀',access:['법무팀','경영지원팀'],updated:'2026-02-05',status:'Running'},
  {id:'KA-005',name:'교육자료',desc:'신입사원 교육 및 기술 교육 자료',docs:310,chunks:15600,size:'2.1 GB',owner:'교육훈련팀',access:['전체'],updated:'2026-02-11',status:'Running'},
  {id:'KA-006',name:'비상대응',desc:'비상 매뉴얼 및 대응 절차',docs:65,chunks:3200,size:'180 MB',owner:'안전관리처',access:['전체'],updated:'2026-01-28',status:'Warning'},
];

const MOCK_USAGE_STATS = {
  daily:[
    {date:'02-08',queries:1240,users:85},{date:'02-09',queries:980,users:72},{date:'02-10',queries:1560,users:102},
    {date:'02-11',queries:1890,users:115},{date:'02-12',queries:2100,users:128},{date:'02-13',queries:1780,users:110},{date:'02-14',queries:920,users:68}
  ],
  byDept:[{dept:'AI연구소',queries:3200,pct:28},{dept:'기술안전팀',queries:2400,pct:21},{dept:'경영지원팀',queries:1800,pct:16},{dept:'안전관리처',queries:1500,pct:13},{dept:'교육훈련팀',queries:1200,pct:10},{dept:'기타',queries:1370,pct:12}],
  byModel:[{model:'GPT-OSS-120B',queries:5200,pct:45},{model:'Llama-3-Kor',queries:3100,pct:27},{model:'EXAONE-3.0',queries:2800,pct:24},{model:'기타',queries:370,pct:4}],
  topKeywords:['안전규정','설비점검','가스누출','인사규정','계약검토','교육자료','비상대응','유지보수','복리후생','출장규정'],
};

const MOCK_ACCESS_LOGS = [
  {id:1,time:'2026-02-14 09:10:23',user:'김영빈',dept:'AI활용 초혁신 추진반',action:'로그인',ip:'10.20.30.41',detail:'SSO 인증 성공'},
  {id:2,time:'2026-02-14 09:08:15',user:'이준호',dept:'기술안전팀',action:'에이전트 호출',ip:'10.20.30.55',detail:'설비 진단 어시스턴트 질의'},
  {id:3,time:'2026-02-14 08:55:02',user:'한서윤',dept:'정보기술팀',action:'모델 설정 변경',ip:'10.20.30.10',detail:'GPT-OSS-120B Temperature 0.3→0.2'},
  {id:4,time:'2026-02-14 08:45:33',user:'박지현',dept:'경영지원팀',action:'문서 업로드',ip:'10.20.30.78',detail:'인사규정_2026_개정안.pdf (2.4MB)'},
  {id:5,time:'2026-02-14 08:30:11',user:'고성민',dept:'안전관리처',action:'에이전트 호출',ip:'10.20.30.62',detail:'비상 대응 가이드 질의'},
  {id:6,time:'2026-02-14 08:20:45',user:'최민수',dept:'법무팀',action:'에이전트 호출',ip:'10.20.30.90',detail:'계약서 검토 에이전트 질의'},
  {id:7,time:'2026-02-13 17:55:10',user:'전하늘',dept:'교육훈련팀',action:'보고서 생성',ip:'10.20.30.44',detail:'기술교육 이수현황 리포트'},
  {id:8,time:'2026-02-13 17:30:22',user:'장영수',dept:'시설관리팀',action:'로그아웃',ip:'10.20.30.33',detail:'세션 종료'},
];

const MOCK_QUALITY_REVIEWS = [
  {id:'QR-001',query:'가스 배관 점검 주기는?',answer:'가스 배관은 매월 1회 정기 점검을 실시하며...',agent:'안전규정 검색 에이전트',reviewer:'고성민',rating:'good',confidence:0.92,date:'2026-02-13',feedback:'정확한 규정 인용'},
  {id:'QR-002',query:'연차 계산 방법 알려줘',answer:'근로기준법에 따라 1년 미만 근로자는...',agent:'HR 질의응답 봇',reviewer:'박지현',rating:'edit',confidence:0.78,date:'2026-02-12',feedback:'공사 내규 추가 필요'},
  {id:'QR-003',query:'LNG 저장탱크 안전밸브 설정압력',answer:'LNG 저장탱크의 안전밸브는...',agent:'설비 진단 어시스턴트',reviewer:'이준호',rating:'good',confidence:0.95,date:'2026-02-11',feedback:''},
  {id:'QR-004',query:'비상시 대피 경로',answer:'본사 건물의 비상 대피 경로는...',agent:'비상 대응 가이드',reviewer:'고성민',rating:'bad',confidence:0.55,date:'2026-02-10',feedback:'층별 대피도 누락, 할루시네이션 의심'},
  {id:'QR-005',query:'수의계약 한도액 기준',answer:'수의계약은 추정가격이 2천만원 이하인 경우...',agent:'계약서 검토 에이전트',reviewer:'최민수',rating:'edit',confidence:0.82,date:'2026-02-09',feedback:'공사 내규 한도액 기준 상이'},
];

const MOCK_ANNOUNCEMENTS = [
  {id:1,title:'GenOS AI 플랫폼 정식 오픈 안내',category:'공지',status:'Running',startDate:'2026-02-01',endDate:'2026-03-01',author:'한서윤',views:452},
  {id:2,title:'시스템 정기 점검 안내 (2/15 02:00~06:00)',category:'점검',status:'Running',startDate:'2026-02-13',endDate:'2026-02-15',author:'한서윤',views:128},
  {id:3,title:'신규 모델 Solar-10.7B 서비스 추가',category:'업데이트',status:'Running',startDate:'2026-02-10',endDate:'2026-02-28',author:'김영빈',views:89},
  {id:4,title:'개인 지식영역 기능 출시',category:'업데이트',status:'Stopped',startDate:'2026-01-15',endDate:'2026-02-01',author:'김영빈',views:310},
];

const MOCK_LINKED_SW = [
  {name:'Milvus Vector DB',version:'2.4.1',status:'Running',endpoint:'milvus.kogas.internal:19530',cpu:12.5,memory:28.4,uptime:'30d 4h'},
  {name:'OCR Engine (Tesseract)',version:'5.3.3',status:'Running',endpoint:'ocr.kogas.internal:8090',cpu:5.2,memory:8.1,uptime:'30d 4h'},
  {name:'vLLM Serving',version:'0.4.2',status:'Running',endpoint:'vllm.kogas.internal:8000',cpu:45.0,memory:62.3,uptime:'14d 2h'},
  {name:'Redis Cache',version:'7.2.4',status:'Running',endpoint:'redis.kogas.internal:6379',cpu:2.1,memory:15.6,uptime:'30d 4h'},
  {name:'MinIO Object Storage',version:'2024.02',status:'Warning',endpoint:'minio.kogas.internal:9000',cpu:8.3,memory:12.0,uptime:'30d 4h'},
  {name:'Agent Runtime',version:'1.2.0',status:'Running',endpoint:'agent.kogas.internal:5000',cpu:18.7,memory:24.5,uptime:'7d 11h'},
];

// ==================== ADDITIONAL ADMIN/USER MOCK DATA ====================
const MOCK_RECENT_ALERTS = [
  {id:1,severity:'critical',title:'GPU 노드 genos-ai-01 #2 온도 78°C 초과',time:'5분 전',source:'시스템 모니터링',ack:false},
  {id:2,severity:'warning',title:'MinIO Object Storage 응답 지연 (avg 850ms)',time:'12분 전',source:'연동 SW',ack:false},
  {id:3,severity:'warning',title:'비상 대응 가이드 에이전트 신뢰도 하락 (0.55)',time:'1시간 전',source:'AI 품질 관리',ack:true},
  {id:4,severity:'info',title:'권한 요청 2건 대기 중',time:'2시간 전',source:'사용자 관리',ack:false},
  {id:5,severity:'critical',title:'가드레일 차단 5건 발생 (개인정보 접근)',time:'3시간 전',source:'보안',ack:true},
  {id:6,severity:'info',title:'골든 데이터 신규 등록 12건',time:'4시간 전',source:'AI 품질 관리',ack:true},
];

const MOCK_TOP_AGENTS_RANK = [
  {name:'HR 질의응답 봇',calls:567,trend:'+12%',up:true,dept:'경영지원팀'},
  {name:'안전규정 검색 에이전트',calls:342,trend:'+8%',up:true,dept:'안전관리처'},
  {name:'기술 교육 튜터',calls:231,trend:'-3%',up:false,dept:'교육훈련팀'},
  {name:'설비 진단 어시스턴트',calls:189,trend:'+15%',up:true,dept:'기술안전팀'},
  {name:'회계전표 자동 작성',calls:78,trend:'+45%',up:true,dept:'정보기술팀'},
  {name:'계약서 검토 에이전트',calls:45,trend:'+5%',up:true,dept:'법무팀'},
];

const MOCK_NOTIFICATIONS_USER = [
  {id:1,type:'approval',title:'권한 요청이 승인되었습니다',desc:'안전규정 DB 접근 권한이 승인되었습니다',time:'10분 전',read:false},
  {id:2,type:'announce',title:'시스템 정기 점검 안내',desc:'2/15 02:00~06:00 점검이 예정되어 있습니다',time:'2시간 전',read:false},
  {id:3,type:'feedback',title:'AI 답변 검토 완료',desc:'계약서 검토 답변이 골든 데이터로 등록되었습니다',time:'5시간 전',read:true},
  {id:4,type:'system',title:'API 키 만료 예정',desc:'genos-api-xxxx-1a2b 가 7일 후 만료됩니다',time:'1일 전',read:true},
  {id:5,type:'agent',title:'새 에이전트가 배포되었습니다',desc:'회계전표 자동 작성 v1.0 - 정보기술팀',time:'2일 전',read:true},
];

const MOCK_FAVORITE_AGENTS = [
  {id:'AGT-001',name:'안전규정 검색 에이전트',calls:42,lastUsed:'2시간 전',pinned:true,model:'GPT-OSS-120B'},
  {id:'AGT-003',name:'HR 질의응답 봇',calls:128,lastUsed:'어제',pinned:true,model:'EXAONE-3.0-7.8B'},
  {id:'AGT-006',name:'기술 교육 튜터',calls:18,lastUsed:'3일 전',pinned:true,model:'EXAONE-3.0-7.8B'},
  {id:'AGT-004',name:'계약서 검토 에이전트',calls:7,lastUsed:'1주 전',pinned:false,model:'GPT-OSS-120B'},
];

const MOCK_RECENT_CHATS = [
  {id:1,agent:'안전규정 검색 에이전트',title:'가스 누출 시 대응 절차',time:'14:32',msgs:8,starred:true},
  {id:2,agent:'HR 질의응답 봇',title:'2026 연차 사용 가이드',time:'어제',msgs:12,starred:false},
  {id:3,agent:'기술 교육 튜터',title:'LNG 저장탱크 구조 설명',time:'2일 전',msgs:6,starred:true},
  {id:4,agent:'계약서 검토 에이전트',title:'수의계약 한도액 검토 요청',time:'1주 전',msgs:15,starred:false},
  {id:5,agent:'안전규정 검색 에이전트',title:'정기 점검 주기 기준',time:'1주 전',msgs:4,starred:false},
];

const MOCK_PERSONAL_KA = [
  {id:'PKA-001',name:'내 학습 자료',docs:12,chunks:540,size:'45 MB',updated:'2026-02-12',status:'Healthy',shared:false},
  {id:'PKA-002',name:'프로젝트 문서',docs:28,chunks:1240,size:'180 MB',updated:'2026-02-10',status:'Healthy',shared:true},
  {id:'PKA-003',name:'개인 메모',docs:45,chunks:230,size:'12 MB',updated:'2026-02-13',status:'Indexing',shared:false},
];

const MOCK_USER_USAGE_DAILY = [
  {date:'02-08',q:42},{date:'02-09',q:38},{date:'02-10',q:55},{date:'02-11',q:62},{date:'02-12',q:48},{date:'02-13',q:71},{date:'02-14',q:26},
];

const MOCK_SECURITY_POLICY = {
  passwordMinLen:10,passwordExpireDays:90,sessionTimeoutMin:30,maxLoginFail:5,
  twoFactorEnabled:true,ipWhitelistEnabled:true,drmEnabled:true,piiMaskingEnabled:true,
  allowedIps:['10.20.0.0/16','192.168.10.0/24','125.130.45.200'],
  blockedFileTypes:['.exe','.bat','.cmd','.sh','.ps1','.dll'],
  auditRetentionDays:730,
};

const MOCK_API_KEYS = [
  {id:1,name:'기본 API 키',key:'genos-api-prod-7f3a-1a2b',scope:'에이전트 호출, 보고서 생성',created:'2025-12-01',lastUsed:'2026-02-14',calls:856,status:'활성',expires:'2026-12-01'},
  {id:2,name:'개발 테스트',key:'genos-api-dev-c9d4-9z8y',scope:'전체',created:'2026-01-15',lastUsed:'2026-02-13',calls:124,status:'활성',expires:'2026-07-15'},
  {id:3,name:'리포팅 자동화',key:'genos-api-rpt-8b2e-3c4d',scope:'보고서 생성, 데이터 조회',created:'2026-02-01',lastUsed:'2026-02-08',calls:42,status:'활성',expires:'2027-02-01'},
];

const MOCK_USAGE_HOURLY = [
  {h:'00',v:5},{h:'02',v:2},{h:'04',v:1},{h:'06',v:3},{h:'08',v:24},{h:'10',v:58},
  {h:'12',v:42},{h:'14',v:65},{h:'16',v:48},{h:'18',v:18},{h:'20',v:8},{h:'22',v:6},
];

const MOCK_KA_DOCS = [
  {name:'2026 안전관리 매뉴얼 v2.1.pdf',size:'4.2 MB',pages:128,chunks:312,uploader:'고성민',date:'2026-02-12',status:'Indexed'},
  {name:'가스누출 비상대응 절차.docx',size:'1.8 MB',pages:42,chunks:98,uploader:'고성민',date:'2026-02-10',status:'Indexed'},
  {name:'설비 점검 체크리스트 (개정).xlsx',size:'520 KB',pages:8,chunks:24,uploader:'이준호',date:'2026-02-09',status:'Indexed'},
  {name:'위험성평가 가이드라인.pdf',size:'2.1 MB',pages:68,chunks:156,uploader:'고성민',date:'2026-02-08',status:'Indexing'},
  {name:'중대재해처벌법 대응 매뉴얼.pdf',size:'3.5 MB',pages:92,chunks:210,uploader:'최민수',date:'2026-02-05',status:'Indexed'},
];

const MOCK_COST_BREAKDOWN = [
  {model:'GPT-OSS-120B',tokens:'8.4M',cost:1280,share:52},
  {model:'Llama-3-Kor-Instruct',tokens:'5.2M',cost:520,share:21},
  {model:'EXAONE-3.0-7.8B',tokens:'12.1M',cost:480,share:19},
  {model:'기타',tokens:'1.8M',cost:200,share:8},
];

// ==================== AGENT MOCK DATA ====================
const MOCK_AGENTS = [
  {id:'AGT-001',name:'안전규정 검색 에이전트',desc:'사내 안전규정 및 매뉴얼을 기반으로 질의응답을 수행합니다.',model:'GPT-OSS-120B',tools:['사내 규정 벡터 DB','웹 검색'],mcpTools:['MCP-Search','MCP-WebCrawler'],ragEnabled:true,hitl:false,a2a:false,responseMode:'knowledge',actionable:false,status:'Running',version:'v2.1',creator:'김세은',dept:'AI연구소',created:'2026-01-15',updated:'2026-02-08',requests24h:342,avgLatency:'1.2s',successRate:98.5,confidence:0.92,systemPrompt:'당신은 한국가스기술공사의 안전 규정 전문가입니다. 사내 규정을 정확히 참조하여 답변하세요.',temperature:0.3,maxTokens:2048},
  {id:'AGT-002',name:'설비 진단 어시스턴트',desc:'가스 설비 이상 징후를 분석하고 점검 절차를 안내합니다. IoT 센서 연동으로 실시간 데이터 분석.',model:'Llama-3-Kor-Instruct',tools:['설비 이력 DB','IoT 센서 API'],mcpTools:['MCP-IoTSensor','MCP-SearchFilter'],ragEnabled:true,hitl:true,a2a:true,responseMode:'knowledge',actionable:false,status:'Running',version:'v1.8',creator:'이준호',dept:'기술안전팀',created:'2026-01-20',updated:'2026-02-10',requests24h:189,avgLatency:'0.8s',successRate:97.2,confidence:0.88,systemPrompt:'가스 설비 전문 진단 도우미입니다. 설비 이력과 센서 데이터를 참조하여 점검 절차를 안내하세요.',temperature:0.2,maxTokens:4096},
  {id:'AGT-003',name:'HR 질의응답 봇',desc:'인사/복리후생/규정 관련 직원 문의에 자동 응답합니다.',model:'EXAONE-3.0-7.8B',tools:['HR 규정 벡터 DB'],mcpTools:['MCP-Search'],ragEnabled:true,hitl:false,a2a:false,responseMode:'knowledge',actionable:false,status:'Running',version:'v1.3',creator:'박지현',dept:'경영지원팀',created:'2025-12-05',updated:'2026-02-03',requests24h:567,avgLatency:'0.5s',successRate:95.8,confidence:0.85,systemPrompt:'한국가스기술공사 인사 규정 전문 도우미입니다. 정확한 조항을 인용하여 답변하세요.',temperature:0.4,maxTokens:1024},
  {id:'AGT-004',name:'계약서 검토 에이전트',desc:'계약서 초안을 검토하고 리스크 조항을 식별합니다.',model:'GPT-OSS-120B',tools:['법률 규정 DB','계약 템플릿 DB'],mcpTools:['MCP-Search','MCP-DynamicFilter'],ragEnabled:true,hitl:true,a2a:false,responseMode:'knowledge',actionable:false,status:'Running',version:'v1.0',creator:'최민수',dept:'법무팀',created:'2026-02-01',updated:'2026-02-09',requests24h:45,avgLatency:'2.1s',successRate:99.1,confidence:0.94,systemPrompt:'계약서 전문 검토 에이전트입니다. 불리한 조항이나 누락된 사항을 식별하세요.',temperature:0.1,maxTokens:4096},
  {id:'AGT-005',name:'시설물 점검 보고서 생성기',desc:'현장 점검 데이터를 기반으로 정형화된 보고서를 자동 생성합니다.',model:'Llama-3-Kor-Instruct',tools:['보고서 템플릿 DB','시설물 이력 DB'],mcpTools:['MCP-CodeDev'],ragEnabled:false,hitl:false,a2a:true,responseMode:'direct',actionable:true,status:'Stopped',version:'v0.9',creator:'장영수',dept:'시설관리팀',created:'2026-01-25',updated:'2026-02-05',requests24h:0,avgLatency:'-',successRate:92.0,confidence:0.76,systemPrompt:'시설물 점검 보고서를 작성하는 전문 에이전트입니다.',temperature:0.5,maxTokens:8192},
  {id:'AGT-006',name:'기술 교육 튜터',desc:'신입사원 및 기술직 대상 가스 기술 교육 질의응답을 제공합니다.',model:'EXAONE-3.0-7.8B',tools:['교육 자료 벡터 DB','웹 검색'],mcpTools:['MCP-Search','MCP-WebSearch'],ragEnabled:true,hitl:false,a2a:false,responseMode:'knowledge',actionable:false,status:'Running',version:'v1.5',creator:'전하늘',dept:'교육훈련팀',created:'2025-11-10',updated:'2026-01-28',requests24h:231,avgLatency:'0.6s',successRate:96.4,confidence:0.87,systemPrompt:'한국가스기술공사 기술 교육 튜터입니다. 쉽고 정확하게 설명하세요.',temperature:0.6,maxTokens:2048},
  {id:'AGT-007',name:'비상 대응 가이드',desc:'가스 누출 등 비상 상황 시 대응 절차를 실시간으로 안내합니다.',model:'GPT-OSS-120B',tools:['비상 매뉴얼 DB','알림 서비스 API'],mcpTools:['MCP-Search','MCP-IoTSensor'],ragEnabled:true,hitl:true,a2a:true,responseMode:'knowledge',actionable:true,status:'Running',version:'v3.0',creator:'고성민',dept:'안전관리처',created:'2025-10-01',updated:'2026-02-11',requests24h:12,avgLatency:'0.9s',successRate:99.8,confidence:0.96,systemPrompt:'비상 대응 전문 에이전트입니다. 신속하고 정확한 대응 절차를 안내하세요.',temperature:0.1,maxTokens:2048},
  {id:'AGT-008',name:'회계전표 자동 작성',desc:'업무 지시를 받아 ERP 시스템에서 회계전표를 자동으로 작성합니다.',model:'GPT-OSS-120B',tools:['ERP 연동 API','회계 규정 DB'],mcpTools:['MCP-ERPConnector','MCP-GWSync'],ragEnabled:false,hitl:true,a2a:true,responseMode:'direct',actionable:true,status:'Running',version:'v1.0',creator:'한서윤',dept:'정보기술팀',created:'2026-02-05',updated:'2026-02-13',requests24h:78,avgLatency:'3.2s',successRate:96.0,confidence:0.90,systemPrompt:'회계전표 작성 전문 에이전트입니다. ERP 시스템과 연동하여 전표를 자동 생성합니다.',temperature:0.1,maxTokens:2048},
];

const MOCK_AGENT_DEPLOYS = [
  {id:'DEP-001',agentId:'AGT-001',agentName:'안전규정 검색 에이전트',model:'GPT-OSS-120B',version:'v2.1',env:'Production',endpoint:'/api/agent/safety-reg',deployDate:'2026-02-08 14:30',deployer:'김세은',status:'Running',replicas:3,cpu:'2 Core',memory:'8 GB',gpu:'H200 x1',uptime:'5d 12h',requests24h:342,errorRate:1.5},
  {id:'DEP-002',agentId:'AGT-002',agentName:'설비 진단 어시스턴트',model:'Llama-3-Kor-Instruct',version:'v1.8',env:'Production',endpoint:'/api/agent/equip-diag',deployDate:'2026-02-10 09:15',deployer:'이준호',status:'Running',replicas:2,cpu:'4 Core',memory:'16 GB',gpu:'H200 x1',uptime:'3d 2h',requests24h:189,errorRate:2.8},
  {id:'DEP-003',agentId:'AGT-003',agentName:'HR 질의응답 봇',model:'EXAONE-3.0-7.8B',version:'v1.3',env:'Production',endpoint:'/api/agent/hr-qa',deployDate:'2026-02-03 11:00',deployer:'박지현',status:'Running',replicas:2,cpu:'1 Core',memory:'4 GB',gpu:'-',uptime:'10d 1h',requests24h:567,errorRate:4.2},
  {id:'DEP-004',agentId:'AGT-004',agentName:'계약서 검토 에이전트',model:'GPT-OSS-120B',version:'v1.0',env:'Staging',endpoint:'/api/agent/contract-review',deployDate:'2026-02-09 16:45',deployer:'최민수',status:'Running',replicas:1,cpu:'2 Core',memory:'8 GB',gpu:'H200 x1',uptime:'4d 5h',requests24h:45,errorRate:0.9},
  {id:'DEP-005',agentId:'AGT-005',agentName:'시설물 점검 보고서 생성기',model:'Llama-3-Kor-Instruct',version:'v0.9',env:'Staging',endpoint:'/api/agent/inspect-report',deployDate:'2026-02-05 10:00',deployer:'장영수',status:'Stopped',replicas:0,cpu:'-',memory:'-',gpu:'-',uptime:'-',requests24h:0,errorRate:0},
  {id:'DEP-006',agentId:'AGT-006',agentName:'기술 교육 튜터',model:'EXAONE-3.0-7.8B',version:'v1.5',env:'Production',endpoint:'/api/agent/edu-tutor',deployDate:'2026-01-28 08:30',deployer:'전하늘',status:'Running',replicas:2,cpu:'1 Core',memory:'4 GB',gpu:'-',uptime:'16d 3h',requests24h:231,errorRate:3.6},
  {id:'DEP-007',agentId:'AGT-007',agentName:'비상 대응 가이드',model:'GPT-OSS-120B',version:'v3.0',env:'Production',endpoint:'/api/agent/emergency',deployDate:'2026-02-11 00:00',deployer:'고성민',status:'Running',replicas:4,cpu:'4 Core',memory:'16 GB',gpu:'H200 x2',uptime:'2d 11h',requests24h:12,errorRate:0.2},
  {id:'DEP-008',agentId:'AGT-008',agentName:'회계전표 자동 작성',model:'GPT-OSS-120B',version:'v1.0',env:'Staging',endpoint:'/api/agent/accounting',deployDate:'2026-02-13 10:30',deployer:'한서윤',status:'Running',replicas:2,cpu:'2 Core',memory:'8 GB',gpu:'H200 x1',uptime:'1d 0h',requests24h:78,errorRate:4.0},
];

const MOCK_WORKFLOWS = [
  {id:'WF-001',name:'설비 이상 종합 대응',desc:'설비 이상 감지 → 진단 → 보고서 생성 → 알림 발송 (A2A 멀티에이전트)',status:'Running',creator:'김세은',created:'2026-02-01',lastRun:'2026-02-13 09:30',runs24h:8,successRate:95.0,protocol:'A2A',hitl:true,
    steps:[{id:'s1',name:'IoT 이상 감지',type:'trigger',agentId:null},{id:'s2',name:'설비 진단 어시스턴트',type:'agent',agentId:'AGT-002'},{id:'s3',name:'HITL 전문가 검토',type:'hitl',agentId:null},{id:'s4',name:'심각도 ≥ 높음',type:'condition',agentId:null},{id:'s5',name:'점검 보고서 생성',type:'agent',agentId:'AGT-005'},{id:'s6',name:'비상 대응 가이드',type:'agent',agentId:'AGT-007'},{id:'s7',name:'MCP 알림 발송',type:'mcp',agentId:null}]},
  {id:'WF-002',name:'신입사원 온보딩 자동화',desc:'HR 질의 → 교육 콘텐츠 추천 → 규정 안내 (MCP 그룹웨어 연동)',status:'Running',creator:'박지현',created:'2026-01-20',lastRun:'2026-02-12 15:00',runs24h:15,successRate:98.0,protocol:'MCP',hitl:false,
    steps:[{id:'s1',name:'신규 입사자 트리거',type:'trigger',agentId:null},{id:'s2',name:'MCP-GWSync',type:'mcp',agentId:null},{id:'s3',name:'HR 질의응답 봇',type:'agent',agentId:'AGT-003'},{id:'s4',name:'기술 교육 튜터',type:'agent',agentId:'AGT-006'},{id:'s5',name:'안전규정 검색 에이전트',type:'agent',agentId:'AGT-001'}]},
  {id:'WF-003',name:'계약 검토 승인 프로세스',desc:'계약서 업로드 → AI 검토 → 리스크 분류 → HITL 승인',status:'Stopped',creator:'최민수',created:'2026-02-05',lastRun:'2026-02-10 11:20',runs24h:0,successRate:100.0,protocol:'A2A',hitl:true,
    steps:[{id:'s1',name:'계약서 업로드',type:'trigger',agentId:null},{id:'s2',name:'계약서 검토 에이전트',type:'agent',agentId:'AGT-004'},{id:'s3',name:'리스크 레벨 분기',type:'condition',agentId:null},{id:'s4',name:'HITL 법무팀 검토',type:'hitl',agentId:null},{id:'s5',name:'승인 요청 발송',type:'action',agentId:null}]},
  {id:'WF-004',name:'회계전표 자동화 파이프라인',desc:'업무 지시 → ERP 데이터 조회 → 전표 작성 → 승인 (Actionable AI)',status:'Running',creator:'한서윤',created:'2026-02-10',lastRun:'2026-02-14 08:30',runs24h:23,successRate:96.5,protocol:'MCP+A2A',hitl:true,
    steps:[{id:'s1',name:'업무 지시 수신',type:'trigger',agentId:null},{id:'s2',name:'MCP-ERPConnector',type:'mcp',agentId:null},{id:'s3',name:'회계전표 자동 작성',type:'agent',agentId:'AGT-008'},{id:'s4',name:'금액 ≥ 100만원',type:'condition',agentId:null},{id:'s5',name:'HITL 결재 요청',type:'hitl',agentId:null},{id:'s6',name:'ERP 전표 등록',type:'action',agentId:null}]},
];

// ==================== HELPER COMPONENTS ====================
const Breadcrumb = ({path}) => (
  <div className="flex items-center space-x-1.5 text-sm text-gray-500 mb-5">
    <Home size={14} className="text-gray-400"/>
    {path.map((item,idx)=>(
      <React.Fragment key={idx}>
        <ChevronRight size={14} className="text-gray-300"/>
        <span className={idx===path.length-1?"font-semibold text-gray-800":"hover:text-blue-600 cursor-pointer"}>{item}</span>
      </React.Fragment>
    ))}
  </div>
);

const StatusBadge = ({status}) => {
  const map = {
    'Running':'bg-green-100 text-green-700','Healthy':'bg-green-100 text-green-700','Online':'bg-green-100 text-green-700',
    '학습 완료':'bg-green-100 text-green-700','완료':'bg-green-100 text-green-700','배포':'bg-blue-100 text-blue-700',
    'Stopped':'bg-gray-100 text-gray-600','Offline':'bg-gray-100 text-gray-600','취소됨':'bg-gray-200 text-gray-600',
    '배포중지':'bg-gray-100 text-gray-600','학습 중':'bg-blue-100 text-blue-700 animate-pulse','실행 중':'bg-blue-100 text-blue-700',
    '중지됨':'bg-gray-100 text-gray-600','오류 발생':'bg-red-100 text-red-700','대기 중':'bg-yellow-100 text-yellow-700',
    'Warning':'bg-yellow-100 text-yellow-700','차단':'bg-red-100 text-red-700','경고':'bg-yellow-100 text-yellow-700',
    'Restarting':'bg-purple-100 text-purple-700 animate-pulse','삭제됨':'bg-red-50 text-red-600',
  };
  return <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${map[status]||'bg-gray-100 text-gray-600'}`}>{status}</span>;
};

const Modal = ({isOpen,onClose,title,children,size='md'}) => {
  if(!isOpen) return null;
  const s = {sm:'max-w-md',md:'max-w-2xl',lg:'max-w-4xl',xl:'max-w-6xl'};
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={onClose}>
      <div className={`bg-white rounded-2xl shadow-2xl w-full ${s[size]} max-h-[90vh] flex flex-col`} onClick={e=>e.stopPropagation()}>
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h3 className="font-bold text-lg">{title}</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full"><X size={20}/></button>
        </div>
        <div className="p-6 overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
};

const SemiGauge = ({value,label,unit='%',color='#22c55e'}) => {
  const pct = Math.min(value/100,1);
  const r=60, cx=80, cy=75;
  const startAngle=-180, endAngle=0;
  const range = endAngle-startAngle;
  const valAngle = startAngle + range*pct;
  const toRad=a=>a*Math.PI/180;
  const arcPath=(start,end)=>{
    const x1=cx+r*Math.cos(toRad(start)),y1=cy+r*Math.sin(toRad(start));
    const x2=cx+r*Math.cos(toRad(end)),y2=cy+r*Math.sin(toRad(end));
    const large=end-start>180?1:0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
  };
  return (
    <div className="bg-white rounded-xl border p-5 flex flex-col items-center">
      <div className="text-sm text-gray-500 mb-2 font-medium">{label}</div>
      <svg width="160" height="100" viewBox="0 0 160 100">
        <path d={arcPath(-180,0)} fill="none" stroke="#e5e7eb" strokeWidth="10" strokeLinecap="round"/>
        {pct>0 && <path d={arcPath(-180,valAngle)} fill="none" stroke={pct>0.8?'#ef4444':pct>0.6?'#f59e0b':color} strokeWidth="10" strokeLinecap="round"/>}
        <text x={cx} y={cy+5} textAnchor="middle" className="text-2xl font-bold" style={{fontSize:'22px',fill:pct>0.8?'#ef4444':pct>0.6?'#f59e0b':color}}>
          {typeof value==='number'?value.toFixed(value<10?2:1):value}{unit}
        </text>
      </svg>
    </div>
  );
};

const PageShell = ({breadcrumb,title,action,children}) => (
  <div className="p-7 h-full overflow-y-auto animate-in">
    <Breadcrumb path={breadcrumb}/>
    {(title||action) && <div className="flex justify-between items-center mb-7">
      {title && <h2 className="text-xl font-bold text-gray-900">{title}</h2>}
      {action}
    </div>}
    {children}
  </div>
);

// ==================== DASHBOARD PAGES ====================
const SystemDashboard = () => {
  const [selectedNode,setSelectedNode]=useState(null);
  return (
    <PageShell breadcrumb={['대시보드','시스템']}>
      <div className="mb-6 flex justify-between items-center">
        <h3 className="text-lg font-bold">클러스터 리소스</h3>
        <span className="text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded border">현재</span>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-8">
        <SemiGauge value={5.32} label="Cluster CPU usage"/>
        <SemiGauge value={35.9} label="Cluster Memory Usage"/>
        <SemiGauge value={26.5} label="GPU Power Usage (AVG.)" unit=" W"/>
        <SemiGauge value={58.4} label="Cluster Filesystem"/>
      </div>
      <h3 className="text-lg font-bold mb-2">서버 정보</h3>
      <div className="bg-white rounded-xl border overflow-hidden mb-8">
        <div className="px-4 py-3 bg-gray-50 text-sm font-semibold text-gray-600">Node Information</div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs text-gray-500 uppercase"><tr>
            <th className="px-4 py-3 text-left">nodename</th><th className="px-4 py-3 text-left">instance</th>
            <th className="px-4 py-3 text-left">OS</th><th className="px-4 py-3 text-left">Version</th>
            <th className="px-4 py-3 text-left">Release</th><th className="px-4 py-3 text-right">CPU Usage(%)</th>
            <th className="px-4 py-3 text-right">MEM Usage(%)</th>
          </tr></thead>
          <tbody className="divide-y">{MOCK_NODES.map((n,i)=>(
            <tr key={i} className="hover:bg-gray-50 cursor-pointer" onClick={()=>setSelectedNode(n)}>
              <td className="px-4 py-3 font-medium">{n.name}</td><td className="px-4 py-3 text-gray-500">{n.instance}</td>
              <td className="px-4 py-3">{n.os}</td><td className="px-4 py-3">{n.version}</td>
              <td className="px-4 py-3 text-gray-500 text-xs">{n.release}</td>
              <td className="px-4 py-3 text-right">{n.cpu}</td><td className="px-4 py-3 text-right">{n.mem}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold">파드 정보</h3>
        <div className="flex space-x-1">{['1h','6h','24h','7d'].map(t=><button key={t} className="px-2.5 py-1 text-xs rounded border hover:bg-blue-50 hover:text-blue-600">{t}</button>)}</div>
      </div>
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm"><thead className="bg-gray-50 text-xs text-gray-500"><tr>
          <th className="px-4 py-2 text-left">Pod Name</th><th className="px-4 py-2 text-left">Namespace</th><th className="px-4 py-2 text-right">CPU</th><th className="px-4 py-2 text-right">Memory</th><th className="px-4 py-2 text-left">Status</th>
        </tr></thead><tbody className="divide-y">
          {[{n:'genos-api-7f8b9c-x2k4p',ns:'production',cpu:'120m',mem:'256Mi',s:'Running'},{n:'llm-serving-gpt-oss-0',ns:'serving',cpu:'4000m',mem:'32Gi',s:'Running'},{n:'embedding-worker-1',ns:'training',cpu:'2000m',mem:'8Gi',s:'Running'},{n:'vector-db-milvus-0',ns:'data',cpu:'500m',mem:'4Gi',s:'Running'},{n:'scheduler-cron-abc12',ns:'system',cpu:'50m',mem:'128Mi',s:'Completed'}].map((p,i)=>(
            <tr key={i} className="hover:bg-gray-50"><td className="px-4 py-2 font-mono text-xs">{p.n}</td><td className="px-4 py-2 text-xs">{p.ns}</td><td className="px-4 py-2 text-right text-xs">{p.cpu}</td><td className="px-4 py-2 text-right text-xs">{p.mem}</td><td className="px-4 py-2"><StatusBadge status={p.s}/></td></tr>
          ))}
        </tbody></table>
      </div>
      <Modal isOpen={!!selectedNode} onClose={()=>setSelectedNode(null)} title={`${selectedNode?.name} 상세 정보`} size="lg">
        {selectedNode&&<div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg"><div className="text-xs text-gray-400">CPU</div><div className="font-bold text-lg">{selectedNode.cpu}%</div></div>
            <div className="bg-gray-50 p-4 rounded-lg"><div className="text-xs text-gray-400">Memory</div><div className="font-bold text-lg">{selectedNode.mem}%</div></div>
            <div className="bg-gray-50 p-4 rounded-lg"><div className="text-xs text-gray-400">OS</div><div className="font-bold">{selectedNode.os} {selectedNode.version}</div></div>
          </div>
          <div className="bg-gray-900 text-green-400 font-mono text-xs p-4 rounded-lg h-48 overflow-y-auto">
            <div className="text-gray-500 border-b border-gray-700 pb-1 mb-2">PID USER PR NI VIRT RES SHR S %CPU %MEM COMMAND</div>
            <div>1234 root 20 0 16.2g 4.1g 124m S 12.0 1.6 python3 train.py</div>
            <div>1452 redis 20 0 4.2g 1.2g 42m S 4.0 0.5 redis-server</div>
            <div>1102 root 20 0 220m 45m 12m S 1.0 0.0 dockerd</div>
          </div>
        </div>}
      </Modal>
    </PageShell>
  );
};

const ServiceDashboard = () => {
  const toast=useToast();
  const [svcs,setSvcs]=useState([
    {id:1,name:'인증 서비스 (SSO)',desc:'사용자 통합 인증',status:'Healthy',up:'14d 2h',cpu:'12%',mem:'256MB',port:8443},
    {id:2,name:'모델 서빙 API',desc:'LLM 추론 엔드포인트',status:'Healthy',up:'14d 2h',cpu:'68%',mem:'32GB',port:8080},
    {id:3,name:'벡터 DB 서비스',desc:'RAG 검색 엔진',status:'Healthy',up:'14d 2h',cpu:'24%',mem:'4GB',port:19530},
    {id:4,name:'로그 수집기',desc:'시스템/감사 로그',status:'Healthy',up:'14d 2h',cpu:'5%',mem:'512MB',port:5044},
    {id:5,name:'알림 서비스',desc:'Slack/Email 연동',status:'Warning',up:'14d 2h',cpu:'8%',mem:'128MB',port:9090},
    {id:6,name:'작업 스케줄러',desc:'배치 작업 관리',status:'Healthy',up:'14d 2h',cpu:'3%',mem:'256MB',port:8090},
  ]);
  const [detail,setDetail]=useState(null);
  const restart=i=>{setSvcs(p=>p.map((s,j)=>j===i?{...s,status:'Restarting'}:s));setTimeout(()=>setSvcs(p=>p.map((s,j)=>j===i?{...s,status:'Healthy'}:s)),2000);toast('서비스 재시작 중...','info');};
  const healthy=svcs.filter(s=>s.status==='Healthy').length;
  return (
    <PageShell breadcrumb={['대시보드','서비스']} title="서비스 상태 모니터링">
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[{l:'전체 서비스',v:svcs.length,c:'bg-blue-50 text-blue-700'},{l:'정상',v:healthy,c:'bg-green-50 text-green-700'},{l:'주의',v:svcs.length-healthy,c:'bg-yellow-50 text-yellow-700'}].map((s,i)=>(
          <div key={i} className={`p-4 rounded-xl ${s.c}`}><div className="text-2xl font-bold">{s.v}</div><div className="text-xs mt-1 opacity-80">{s.l}</div></div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">{svcs.map((s,i)=>(
        <div key={s.id} className="bg-white p-5 rounded-xl border hover:border-blue-300 transition-all cursor-pointer" onClick={()=>setDetail(s)}>
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-2">
              <span className={`w-2 h-2 rounded-full ${s.status==='Healthy'?'bg-green-500':s.status==='Warning'?'bg-yellow-500':'bg-purple-500 animate-pulse'}`}/>
              <div><div className="font-bold text-sm">{s.name}</div><div className="text-xs text-gray-500">{s.desc}</div></div>
            </div>
            <StatusBadge status={s.status}/>
          </div>
          <div className="flex justify-between items-end pt-3 border-t">
            <span className="text-xs text-gray-400 font-mono">Up: {s.up}</span>
            <button onClick={e=>{e.stopPropagation();restart(i);}} disabled={s.status==='Restarting'} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded disabled:opacity-50">
              <RotateCcw size={14} className={s.status==='Restarting'?'animate-spin':''}/>
            </button>
          </div>
        </div>
      ))}</div>
      <Modal isOpen={!!detail} onClose={()=>setDetail(null)} title={detail?.name} size="md">
        {detail&&<div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">{[['CPU 사용률',detail.cpu],['메모리',detail.mem],['포트',detail.port],['가동시간',detail.up]].map(([k,v],i)=>(
            <div key={i} className="bg-gray-50 p-3 rounded-lg"><div className="text-xs text-gray-400">{k}</div><div className="font-medium">{v}</div></div>
          ))}</div>
          <div><StatusBadge status={detail.status}/></div>
        </div>}
      </Modal>
    </PageShell>
  );
};

const GpuDashboard = () => {
  const [detailGpu,setDetailGpu]=useState(null);
  const allGpus=MOCK_GPU_NODES.flatMap(n=>n.gpus);
  const avgUtil=Math.round(allGpus.reduce((a,g)=>a+g.util,0)/allGpus.length);
  const avgTemp=Math.round(allGpus.reduce((a,g)=>a+g.temp,0)/allGpus.length);
  const overloaded=allGpus.filter(g=>g.util>90).length;
  return (
    <PageShell breadcrumb={['대시보드','GPU']} title="GPU 클러스터">
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[{l:'총 GPU',v:allGpus.length,c:'bg-blue-50 text-blue-700'},{l:'평균 사용률',v:`${avgUtil}%`,c:'bg-green-50 text-green-700'},{l:'평균 온도',v:`${avgTemp}°C`,c:'bg-orange-50 text-orange-700'},{l:'과부하',v:overloaded,c:overloaded>0?'bg-red-50 text-red-700':'bg-gray-50 text-gray-700'}].map((s,i)=>(
          <div key={i} className={`p-4 rounded-xl ${s.c}`}><div className="text-2xl font-bold">{s.v}</div><div className="text-xs mt-1 opacity-80">{s.l}</div></div>
        ))}
      </div>
      <div className="space-y-6">{MOCK_GPU_NODES.map(node=>(
        <div key={node.id} className="bg-white rounded-xl border overflow-hidden">
          <div className="px-5 py-4 bg-gray-50 border-b flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Cpu className="text-gray-500" size={20}/>
              <div><h3 className="font-bold">{node.name}</h3><p className="text-xs text-gray-500">{node.model} x{node.count} ({node.memory})</p></div>
            </div>
          </div>
          <div className="p-5 grid grid-cols-4 gap-4">{node.gpus.map(gpu=>(
            <div key={gpu.id} className="bg-gray-50 rounded-lg p-4 border hover:border-blue-300 transition-colors cursor-pointer" onClick={()=>setDetailGpu({...gpu,node:node.name,model:node.model})}>
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-sm">GPU {gpu.id}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${gpu.util>90?'bg-red-100 text-red-600':'bg-green-100 text-green-600'}`}>{gpu.util>90?'과부하':'정상'}</span>
              </div>
              <div className="mb-3"><div className="flex justify-between text-xs text-gray-500 mb-1"><span>Util</span><span>{gpu.util}%</span></div>
                <div className="w-full bg-gray-200 rounded-full h-1.5"><div className="bg-blue-500 h-1.5 rounded-full transition-all" style={{width:`${gpu.util}%`}}/></div></div>
              <div className="mb-3"><div className="flex justify-between text-xs text-gray-500 mb-1"><span>VRAM</span><span>{gpu.memUtil}%</span></div>
                <div className="w-full bg-gray-200 rounded-full h-1.5"><div className="bg-purple-500 h-1.5 rounded-full transition-all" style={{width:`${gpu.memUtil}%`}}/></div></div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white p-2 rounded border text-center"><span className="text-gray-400 block">온도</span><span className={`font-bold ${gpu.temp>80?'text-red-500':''}`}>{gpu.temp}°C</span></div>
                <div className="bg-white p-2 rounded border text-center"><span className="text-gray-400 block">전력</span><span className="font-bold">{gpu.power}W</span></div>
              </div>
            </div>
          ))}</div>
        </div>
      ))}</div>
      <Modal isOpen={!!detailGpu} onClose={()=>setDetailGpu(null)} title={`GPU ${detailGpu?.id} 상세`} size="md">
        {detailGpu&&<div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">{[['노드',detailGpu.node],['모델',detailGpu.model],['GPU ID',detailGpu.id],['사용률',`${detailGpu.util}%`],['VRAM',`${detailGpu.memUtil}%`],['온도',`${detailGpu.temp}°C`],['전력',`${detailGpu.power}W`]].map(([k,v],i)=>(
            <div key={i} className="bg-gray-50 p-3 rounded-lg"><div className="text-xs text-gray-400">{k}</div><div className="font-medium">{v}</div></div>
          ))}</div>
        </div>}
      </Modal>
    </PageShell>
  );
};

const DashboardTrainer = () => {
  const [period,setPeriod]=useState('주간');
  return (
    <PageShell breadcrumb={['대시보드','트레이너']} title="학습 작업 현황">
      <div className="flex space-x-1 mb-4">{['일간','주간','월간'].map(p=>(
        <button key={p} onClick={()=>setPeriod(p)} className={`px-4 py-1.5 text-sm rounded-lg ${period===p?'bg-blue-600 text-white':'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{p}</button>
      ))}</div>
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl border">
          <h3 className="font-bold mb-4">{period} 학습 요약</h3>
          <div className="space-y-3">
            {[{label:'완료된 작업',count:period==='일간'?5:period==='주간'?24:96,color:'text-blue-700 bg-blue-50'},{label:'실패한 작업',count:period==='일간'?0:period==='주간'?2:8,color:'text-red-600 bg-red-50'},{label:'대기 중 작업',count:period==='일간'?1:period==='주간'?3:5,color:'text-yellow-600 bg-yellow-50'}].map((s,i)=>(
              <div key={i} className={`flex justify-between items-center p-4 rounded-lg border ${s.color}`}>
                <span className="text-sm font-medium">{s.label}</span><span className="font-bold text-lg">{s.count}건</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border">
          <h3 className="font-bold mb-4">리소스 배분 현황</h3>
          <div className="flex items-center justify-center space-x-8 py-4">
            <div className="relative w-40 h-40 rounded-full" style={{background:'conic-gradient(#3b82f6 0% 60%, #8b5cf6 60% 80%, #10b981 80% 95%, #e2e8f0 95% 100%)'}}>
              <div className="absolute inset-0 m-auto w-28 h-28 bg-white rounded-full flex flex-col items-center justify-center shadow-inner"><span className="text-2xl font-bold">95%</span><span className="text-xs text-gray-500">Total</span></div>
            </div>
            <div className="space-y-3 text-sm">
              {[{l:'LLM 학습',v:60,c:'#3b82f6'},{l:'RAG 임베딩',v:20,c:'#8b5cf6'},{l:'추론',v:15,c:'#10b981'},{l:'대기',v:5,c:'#e2e8f0'}].map((d,i)=>(
                <div key={i} className="flex items-center"><span className="w-3 h-3 rounded-full mr-2" style={{backgroundColor:d.c}}/><span className="text-gray-500 w-20">{d.l}</span><span className="font-bold">{d.v}%</span></div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <h3 className="font-bold mb-3">최근 학습 작업</h3>
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm"><thead className="bg-gray-50 text-xs text-gray-500"><tr>
          <th className="px-4 py-2 text-left">Job ID</th><th className="px-4 py-2 text-left">모델</th><th className="px-4 py-2 text-left">유형</th><th className="px-4 py-2 text-left">시작</th><th className="px-4 py-2 text-left">상태</th>
        </tr></thead><tbody className="divide-y">
          {[{id:'JOB-992',m:'GPT-OSS-120B',t:'LoRA',d:'02-10 14:30',s:'학습 중'},{id:'JOB-991',m:'Llama-3-Kor',t:'QLoRA',d:'02-09 09:00',s:'학습 완료'},{id:'VLM-102',m:'InternVL-2-8B',t:'VLM',d:'02-10 10:00',s:'학습 중'},{id:'EMB-003',m:'KoE5-large',t:'임베딩',d:'02-08 16:00',s:'학습 완료'}].map(j=>(
            <tr key={j.id} className="hover:bg-gray-50"><td className="px-4 py-2 font-mono text-xs">{j.id}</td><td className="px-4 py-2 font-medium">{j.m}</td><td className="px-4 py-2">{j.t}</td><td className="px-4 py-2 text-gray-500 text-xs">{j.d}</td><td className="px-4 py-2"><StatusBadge status={j.s}/></td></tr>
          ))}
        </tbody></table>
      </div>
    </PageShell>
  );
};

// ==================== DEV PAGES ====================
const DatasetPage = () => {
  const toast=useToast();
  const [datasets,setDatasets]=useState([
    {id:1,n:'Safety_Regulations_QA_v1',d:'안전 규정 QA 데이터셋',t:'JSONL',s:'124MB',c:'15,000',date:'2026-02-10'},
    {id:2,n:'Maintenance_Manual_Corpus',d:'장비 유지보수 매뉴얼',t:'TXT',s:'512MB',c:'N/A',date:'2026-02-09'},
    {id:3,n:'Employee_Inquiry_Logs',d:'임직원 질의 로그',t:'CSV',s:'45MB',c:'8,200',date:'2026-02-08'},
    {id:4,n:'Gemma_Instruction_Tuning',d:'Gemma 한국어 인스트럭션',t:'JSONL',s:'230MB',c:'25,000',date:'2026-02-07'},
    {id:5,n:'EXAONE_Finance_Report',d:'재무 보고서 요약 학습',t:'Parquet',s:'1.2GB',c:'5,000',date:'2026-02-06'},
  ]);
  const [search,setSearch]=useState('');const [showCreate,setShowCreate]=useState(false);const [detail,setDetail]=useState(null);const [confirmDel,setConfirmDel]=useState(null);
  const [form,setForm]=useState({name:'',desc:'',type:'JSONL'});
  const filtered=datasets.filter(d=>d.n.toLowerCase().includes(search.toLowerCase())||d.d.includes(search));
  return (
    <PageShell breadcrumb={['데이터','데이터셋']} title="데이터셋 관리" action={<button onClick={()=>setShowCreate(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center"><Plus size={16} className="mr-1"/>데이터셋 생성</button>}>
      <div className="relative max-w-sm mb-4"><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="데이터셋 검색..." className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/><Search size={16} className="absolute left-3 top-2.5 text-gray-400"/></div>
      <div className="grid grid-cols-3 gap-4">{filtered.map(d=>(
        <div key={d.id} className="bg-white p-5 rounded-xl border hover:border-blue-300 cursor-pointer transition-all" onClick={()=>setDetail(d)}>
          <div className="flex justify-between items-start mb-3"><div className="p-2.5 bg-purple-50 text-purple-600 rounded-lg"><Database size={20}/></div><span className="text-xs text-gray-400">{d.date}</span></div>
          <h3 className="font-bold text-sm mb-1">{d.n}</h3>
          <p className="text-xs text-gray-500 mb-3 h-8">{d.d}</p>
          <div className="flex space-x-1.5 text-xs">{[d.t,d.s,d.c+' items'].map((t,j)=><span key={j} className="bg-gray-100 px-2 py-0.5 rounded">{t}</span>)}</div>
        </div>
      ))}</div>
      <Modal isOpen={showCreate} onClose={()=>setShowCreate(false)} title="데이터셋 생성" size="md">
        <div className="space-y-4">
          <div><label className="block text-sm font-medium mb-1">이름</label><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm"/></div>
          <div><label className="block text-sm font-medium mb-1">설명</label><input value={form.desc} onChange={e=>setForm({...form,desc:e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm"/></div>
          <div><label className="block text-sm font-medium mb-1">유형</label><select value={form.type} onChange={e=>setForm({...form,type:e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm"><option>JSONL</option><option>CSV</option><option>TXT</option><option>Parquet</option></select></div>
          <button onClick={()=>{if(!form.name)return;setDatasets(p=>[{id:Date.now(),n:form.name,d:form.desc,t:form.type,s:'0MB',c:'0',date:'2026-02-11'},...p]);setShowCreate(false);setForm({name:'',desc:'',type:'JSONL'});toast('데이터셋이 생성되었습니다');}} className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium text-sm">생성</button>
        </div>
      </Modal>
      <Modal isOpen={!!detail} onClose={()=>setDetail(null)} title={detail?.n} size="lg">
        {detail&&<div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">{[['유형',detail.t],['크기',detail.s],['건수',detail.c],['생성일',detail.date],['설명',detail.d]].map(([k,v],i)=>(
            <div key={i} className={`bg-gray-50 p-3 rounded-lg ${i===4?'col-span-2':''}`}><div className="text-xs text-gray-400">{k}</div><div className="font-medium">{v}</div></div>
          ))}</div>
          <button onClick={()=>{setConfirmDel(detail);setDetail(null);}} className="w-full bg-red-50 text-red-600 py-2 rounded-lg text-sm font-medium hover:bg-red-100">삭제</button>
        </div>}
      </Modal>
      <ConfirmDialog isOpen={!!confirmDel} onClose={()=>setConfirmDel(null)} onConfirm={()=>{setDatasets(p=>p.filter(x=>x.id!==confirmDel.id));setConfirmDel(null);toast('데이터셋이 삭제되었습니다','info');}} title="데이터셋 삭제" message={`'${confirmDel?.n}'을(를) 삭제하시겠습니까?`} confirmText="삭제" danger/>
    </PageShell>
  );
};

const VectorDbPage = () => {
  const toast=useToast();
  const [query,setQuery]=useState('');const [results,setResults]=useState(null);const [searching,setSearching]=useState(false);
  const [collections]=useState([
    {name:'safety_regulations',vectors:'850K',dim:1024,status:'Active',updated:'2026-02-10'},
    {name:'maintenance_manual',vectors:'420K',dim:1024,status:'Active',updated:'2026-02-09'},
    {name:'employee_qa_logs',vectors:'680K',dim:768,status:'Active',updated:'2026-02-10'},
    {name:'financial_reports',vectors:'210K',dim:1024,status:'Active',updated:'2026-02-08'},
    {name:'training_materials',vectors:'240K',dim:768,status:'Building',updated:'2026-02-11'},
  ]);
  const doSearch=()=>{if(!query.trim())return;setSearching(true);setTimeout(()=>{setResults([
    {id:'vec_8a1',score:0.92,content:'...본 규정은 한국가스기술공사의 안전관리 업무 수행에 필요한 사항을 규정함을 목적으로 한다...'},
    {id:'vec_3b2',score:0.88,content:'...제 2 조 (적용범위) 이 규정은 공사의 전 임직원 및 사업장 내 협력업체에 적용하며...'},
    {id:'vec_9c3',score:0.75,content:'...가스 설비의 유지보수는 매월 1회 정기 점검을 원칙으로 하며...'},
  ]);setSearching(false);},800);};
  return (
    <PageShell breadcrumb={['데이터','벡터 DB']}>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-5 rounded-xl border"><div className="text-3xl font-bold mb-1">2.4M</div><div className="text-sm text-gray-500">총 벡터 수</div></div>
        <div className="bg-white p-5 rounded-xl border"><div className="text-3xl font-bold mb-1">{collections.length}</div><div className="text-sm text-gray-500">활성 컬렉션</div></div>
        <div className="bg-white p-5 rounded-xl border"><div className="text-3xl font-bold mb-1">45ms</div><div className="text-sm text-gray-500">평균 쿼리 지연</div></div>
      </div>
      <div className="bg-white rounded-xl border p-5 mb-6">
        <h3 className="font-bold mb-3 flex items-center"><Search size={18} className="mr-2 text-blue-600"/>벡터 검색 시뮬레이터</h3>
        <div className="flex space-x-2 mb-4">
          <input value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>e.key==='Enter'&&doSearch()} placeholder="테스트할 검색어 입력..." className="flex-1 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <button onClick={doSearch} disabled={searching} className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50">{searching?'검색 중...':'검색'}</button>
        </div>
        {results&&<div className="space-y-2">{results.map((r,i)=>(
          <div key={i} className="bg-gray-50 border rounded-lg p-3 hover:border-blue-300">
            <div className="flex justify-between mb-1"><span className="text-xs font-mono text-gray-500">{r.id}</span><span className="text-xs font-bold text-blue-600">유사도: {r.score}</span></div>
            <p className="text-sm text-gray-700">{r.content}</p>
          </div>
        ))}</div>}
      </div>
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold">컬렉션 관리</h3>
        <button onClick={()=>toast('컬렉션이 생성되었습니다')} className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center"><Plus size={14} className="mr-1"/>컬렉션 생성</button>
      </div>
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm"><thead className="bg-gray-50 text-xs text-gray-500 uppercase"><tr>
          <th className="px-4 py-3 text-left">컬렉션명</th><th className="px-4 py-3 text-right">벡터 수</th><th className="px-4 py-3 text-right">차원</th><th className="px-4 py-3 text-left">상태</th><th className="px-4 py-3 text-left">최근 업데이트</th>
        </tr></thead><tbody className="divide-y">{collections.map((c,i)=>(
          <tr key={i} className="hover:bg-gray-50"><td className="px-4 py-3 font-mono text-sm font-medium">{c.name}</td><td className="px-4 py-3 text-right">{c.vectors}</td><td className="px-4 py-3 text-right">{c.dim}</td><td className="px-4 py-3"><StatusBadge status={c.status}/></td><td className="px-4 py-3 text-gray-500 text-xs">{c.updated}</td></tr>
        ))}</tbody></table>
      </div>
    </PageShell>
  );
};

const AutoLoadPage = () => {
  const toast=useToast();
  const [sources,setSources]=useState([
    {id:1,n:'ERP_HR_DB',t:'Oracle DB',s:'매일 02:00',l:'2026-02-10 02:00',st:'Healthy',active:true},
    {id:2,n:'SharePoint_Docs',t:'API Crawler',s:'매시간',l:'2026-02-10 11:00',st:'Healthy',active:true},
    {id:3,n:'Legacy_File_Server',t:'SMB Mount',s:'매주 (일)',l:'2026-02-09 00:00',st:'Warning',active:true},
    {id:4,n:'IoT_Sensor_Logs',t:'MQTT Stream',s:'실시간',l:'실행 중',st:'Healthy',active:true},
  ]);
  const [showAdd,setShowAdd]=useState(false);const [confirmRun,setConfirmRun]=useState(null);
  const [form,setForm]=useState({name:'',type:'Oracle DB',schedule:'매일 02:00'});
  return (
    <PageShell breadcrumb={['데이터','자동 적재']} title="데이터 자동 적재 설정" action={<button onClick={()=>setShowAdd(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center"><Plus size={16} className="mr-1"/>소스 추가</button>}>
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm"><thead className="bg-gray-50 text-xs text-gray-500 uppercase"><tr>
          <th className="px-4 py-3 text-left">소스명</th><th className="px-4 py-3 text-left">유형</th><th className="px-4 py-3 text-left">주기</th><th className="px-4 py-3 text-left">최근 실행</th><th className="px-4 py-3 text-left">상태</th><th className="px-4 py-3 text-center">활성</th><th className="px-4 py-3 text-center">액션</th>
        </tr></thead><tbody className="divide-y">{sources.map(r=>(
          <tr key={r.id} className={`hover:bg-gray-50 ${!r.active?'opacity-50':''}`}>
            <td className="px-4 py-3 font-medium">{r.n}</td><td className="px-4 py-3">{r.t}</td><td className="px-4 py-3">{r.s}</td><td className="px-4 py-3 text-gray-500">{r.l}</td><td className="px-4 py-3"><StatusBadge status={r.st}/></td>
            <td className="px-4 py-3 text-center"><ToggleSwitch on={r.active} onClick={()=>{setSources(p=>p.map(x=>x.id===r.id?{...x,active:!x.active}:x));toast(r.active?`${r.n} 비활성화`:`${r.n} 활성화`,r.active?'info':'success');}}/></td>
            <td className="px-4 py-3 text-center"><button onClick={()=>setConfirmRun(r)} className="text-xs text-blue-600 hover:underline">지금 실행</button></td>
          </tr>
        ))}</tbody></table>
      </div>
      <Modal isOpen={showAdd} onClose={()=>setShowAdd(false)} title="소스 추가" size="md">
        <div className="space-y-4">
          <div><label className="block text-sm font-medium mb-1">소스명</label><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm"/></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium mb-1">유형</label><select value={form.type} onChange={e=>setForm({...form,type:e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm"><option>Oracle DB</option><option>API Crawler</option><option>SMB Mount</option><option>MQTT Stream</option><option>S3 Bucket</option></select></div>
            <div><label className="block text-sm font-medium mb-1">주기</label><select value={form.schedule} onChange={e=>setForm({...form,schedule:e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm"><option>실시간</option><option>매시간</option><option>매일 02:00</option><option>매주 (일)</option></select></div>
          </div>
          <button onClick={()=>{if(!form.name)return;setSources(p=>[...p,{id:Date.now(),n:form.name,t:form.type,s:form.schedule,l:'-',st:'Healthy',active:true}]);setShowAdd(false);setForm({name:'',type:'Oracle DB',schedule:'매일 02:00'});toast('소스가 추가되었습니다');}} className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium text-sm">추가</button>
        </div>
      </Modal>
      <ConfirmDialog isOpen={!!confirmRun} onClose={()=>setConfirmRun(null)} onConfirm={()=>{setSources(p=>p.map(x=>x.id===confirmRun.id?{...x,l:'실행 중',st:'Healthy'}:x));setConfirmRun(null);toast(`${confirmRun?.n} 적재가 시작되었습니다`);}} title="지금 실행" message={`'${confirmRun?.n}'을(를) 즉시 실행하시겠습니까?`} confirmText="실행"/>
    </PageShell>
  );
};

const CodespacePage = () => {
  const toast=useToast();
  const [spaces,setSpaces]=useState(MOCK_CODESPACES.map(c=>({...c})));
  const [showCreate,setShowCreate]=useState(false);const [confirmDel,setConfirmDel]=useState(null);
  const [form,setForm]=useState({name:'',image:'pytorch/pytorch:2.1-cuda12',gpu:'A100 x1'});
  const toggleStatus=(id)=>{setSpaces(p=>p.map(c=>{if(c.id!==id)return c;const ns=c.status==='Running'?'Stopped':'Running';toast(ns==='Running'?`${c.name} 시작됨`:`${c.name} 중지됨`,ns==='Running'?'success':'info');return{...c,status:ns};}));};
  return (
    <PageShell breadcrumb={['개발','코드스페이스']} title="코드스페이스" action={<button onClick={()=>setShowCreate(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center"><Plus size={16} className="mr-1"/>새 환경 생성</button>}>
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm"><thead className="bg-gray-50 text-xs text-gray-500 uppercase"><tr>
          <th className="px-4 py-3 text-left">이름</th><th className="px-4 py-3 text-left">Docker 이미지</th><th className="px-4 py-3 text-left">상태</th><th className="px-4 py-3 text-left">GPU</th><th className="px-4 py-3 text-left">생성일</th><th className="px-4 py-3 text-center">액션</th>
        </tr></thead><tbody className="divide-y">{spaces.map(c=>(
          <tr key={c.id} className="hover:bg-gray-50"><td className="px-4 py-3 font-medium">{c.name}</td><td className="px-4 py-3 text-gray-500 font-mono text-xs">{c.image}</td><td className="px-4 py-3"><StatusBadge status={c.status}/></td><td className="px-4 py-3">{c.gpu}</td><td className="px-4 py-3 text-gray-500">{c.created}</td>
            <td className="px-4 py-3 text-center space-x-2">
              <button onClick={()=>toggleStatus(c.id)} className={`text-xs px-2 py-1 rounded ${c.status==='Running'?'bg-orange-50 text-orange-600 hover:bg-orange-100':'bg-green-50 text-green-600 hover:bg-green-100'}`}>{c.status==='Running'?'중지':'시작'}</button>
              <button onClick={()=>setConfirmDel(c)} className="text-xs px-2 py-1 rounded bg-red-50 text-red-600 hover:bg-red-100">삭제</button>
            </td>
          </tr>
        ))}</tbody></table>
      </div>
      <Modal isOpen={showCreate} onClose={()=>setShowCreate(false)} title="새 코드스페이스 생성" size="md">
        <div className="space-y-4">
          <div><label className="block text-sm font-medium mb-1">이름</label><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm"/></div>
          <div><label className="block text-sm font-medium mb-1">Docker 이미지</label><select value={form.image} onChange={e=>setForm({...form,image:e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm"><option>pytorch/pytorch:2.1-cuda12</option><option>tensorflow/tensorflow:2.15-gpu</option><option>jupyter/datascience-notebook</option><option>vllm/vllm-openai:latest</option></select></div>
          <div><label className="block text-sm font-medium mb-1">GPU</label><select value={form.gpu} onChange={e=>setForm({...form,gpu:e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm"><option>None</option><option>A100 x1</option><option>A100 x2</option><option>A100 x4</option></select></div>
          <button onClick={()=>{if(!form.name)return;setSpaces(p=>[{id:`cs-${Date.now()}`,name:form.name,image:form.image,status:'Stopped',gpu:form.gpu,created:'2026-02-11'},...p]);setShowCreate(false);setForm({name:'',image:'pytorch/pytorch:2.1-cuda12',gpu:'A100 x1'});toast('코드스페이스가 생성되었습니다');}} className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium text-sm">생성</button>
        </div>
      </Modal>
      <ConfirmDialog isOpen={!!confirmDel} onClose={()=>setConfirmDel(null)} onConfirm={()=>{setSpaces(p=>p.filter(x=>x.id!==confirmDel.id));setConfirmDel(null);toast('코드스페이스가 삭제되었습니다','info');}} title="코드스페이스 삭제" message={`'${confirmDel?.name}'을(를) 삭제하시겠습니까?`} confirmText="삭제" danger/>
    </PageShell>
  );
};

const SharedVolumePage = () => {
  const toast=useToast();
  const [volumes,setVolumes]=useState(MOCK_VOLUMES.map((v,i)=>({...v,id:i+1})));
  const [showCreate,setShowCreate]=useState(false);const [resizeVol,setResizeVol]=useState(null);const [confirmDel,setConfirmDel]=useState(null);
  const [form,setForm]=useState({name:'',size:'100GB',mount:'/mnt/shared/'});const [newSize,setNewSize]=useState('');
  return (
    <PageShell breadcrumb={['개발','공유 볼륨']} title="공유 볼륨 관리" action={<button onClick={()=>setShowCreate(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center"><Plus size={16} className="mr-1"/>볼륨 생성</button>}>
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm"><thead className="bg-gray-50 text-xs text-gray-500 uppercase"><tr>
          <th className="px-4 py-3 text-left">이름</th><th className="px-4 py-3 text-left">크기</th><th className="px-4 py-3 text-left">마운트 경로</th><th className="px-4 py-3 text-left">사용 환경</th><th className="px-4 py-3 text-left">상태</th><th className="px-4 py-3 text-center">액션</th>
        </tr></thead><tbody className="divide-y">{volumes.map(v=>(
          <tr key={v.id} className="hover:bg-gray-50"><td className="px-4 py-3 font-medium">{v.name}</td><td className="px-4 py-3">{v.size}</td><td className="px-4 py-3 font-mono text-xs text-gray-500">{v.mount}</td><td className="px-4 py-3 text-gray-500">{v.usedBy}</td><td className="px-4 py-3"><StatusBadge status={v.status}/></td>
            <td className="px-4 py-3 text-center space-x-2">
              <button onClick={()=>{setResizeVol(v);setNewSize(v.size);}} className="text-xs text-blue-600 hover:underline">리사이즈</button>
              <button onClick={()=>setConfirmDel(v)} className="text-xs text-red-500 hover:underline">삭제</button>
            </td>
          </tr>
        ))}</tbody></table>
      </div>
      <Modal isOpen={showCreate} onClose={()=>setShowCreate(false)} title="볼륨 생성" size="md">
        <div className="space-y-4">
          <div><label className="block text-sm font-medium mb-1">이름</label><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm"/></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium mb-1">크기</label><select value={form.size} onChange={e=>setForm({...form,size:e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm"><option>50GB</option><option>100GB</option><option>500GB</option><option>1TB</option><option>5TB</option></select></div>
            <div><label className="block text-sm font-medium mb-1">마운트 경로</label><input value={form.mount} onChange={e=>setForm({...form,mount:e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm font-mono"/></div>
          </div>
          <button onClick={()=>{if(!form.name)return;setVolumes(p=>[...p,{id:Date.now(),name:form.name,size:form.size,mount:form.mount,usedBy:'-',status:'Mounted'}]);setShowCreate(false);setForm({name:'',size:'100GB',mount:'/mnt/shared/'});toast('볼륨이 생성되었습니다');}} className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium text-sm">생성</button>
        </div>
      </Modal>
      <Modal isOpen={!!resizeVol} onClose={()=>setResizeVol(null)} title={`${resizeVol?.name} 리사이즈`} size="sm">
        <div className="space-y-4">
          <div><label className="block text-sm font-medium mb-1">새 크기</label><select value={newSize} onChange={e=>setNewSize(e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm"><option>50GB</option><option>100GB</option><option>500GB</option><option>1TB</option><option>5TB</option><option>10TB</option></select></div>
          <button onClick={()=>{setVolumes(p=>p.map(x=>x.id===resizeVol.id?{...x,size:newSize}:x));setResizeVol(null);toast('볼륨 크기가 변경되었습니다');}} className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium text-sm">적용</button>
        </div>
      </Modal>
      <ConfirmDialog isOpen={!!confirmDel} onClose={()=>setConfirmDel(null)} onConfirm={()=>{setVolumes(p=>p.filter(x=>x.id!==confirmDel.id));setConfirmDel(null);toast('볼륨이 삭제되었습니다','info');}} title="볼륨 삭제" message={`'${confirmDel?.name}'을(를) 삭제하시겠습니까? 데이터가 영구 삭제됩니다.`} confirmText="삭제" danger/>
    </PageShell>
  );
};

// ==================== MODEL, TRAINER, EVAL, GUARDRAIL ====================
const ModelRegistry = () => {
  const toast=useToast();
  const [models,setModels]=useState(MOCK_MODELS.map(m=>({...m})));
  const [search,setSearch]=useState('');const [showCreate,setShowCreate]=useState(false);const [detail,setDetail]=useState(null);const [confirmAction,setConfirmAction]=useState(null);
  const [form,setForm]=useState({name:'',param:'7B',context:'4K',quant:'FP16'});
  const filtered=models.filter(m=>m.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <PageShell breadcrumb={['모델']} title="모델 레지스트리" action={<button onClick={()=>setShowCreate(true)} className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center"><Plus size={16} className="mr-1"/>모델 등록</button>}>
      <div className="relative max-w-sm mb-4"><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="모델 검색..." className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/><Search size={16} className="absolute left-3 top-2.5 text-gray-400"/></div>
      <div className="space-y-3">{filtered.map(m=>(
        <div key={m.id} className="bg-white p-5 rounded-xl border flex items-center justify-between hover:border-blue-300 transition-all cursor-pointer" onClick={()=>setDetail(m)}>
          <div className="flex items-center space-x-4">
            <div className="w-11 h-11 bg-gray-100 rounded-lg flex items-center justify-center font-bold text-gray-600">AI</div>
            <div><h3 className="font-bold">{m.name}</h3>
              <div className="flex space-x-2 mt-1 text-xs">{[`파라미터: ${m.param}`,`문맥: ${m.context}`,`양자화: ${m.quant}`].map((t,i)=><span key={i} className="bg-gray-100 px-2 py-0.5 rounded border">{t}</span>)}</div>
            </div>
          </div>
          <div className="flex items-center space-x-4" onClick={e=>e.stopPropagation()}>
            <div className="text-right text-sm"><div className="text-xs text-gray-400">로드 노드</div><div className="font-medium">{m.loaded}</div></div>
            <StatusBadge status={m.status}/>
            <button onClick={()=>setConfirmAction({model:m,action:m.status==='Running'?'unload':'load'})} className={`text-xs px-3 py-1.5 rounded font-medium ${m.status==='Running'?'bg-orange-50 text-orange-600 hover:bg-orange-100':'bg-green-50 text-green-600 hover:bg-green-100'}`}>{m.status==='Running'?'언로드':'로드'}</button>
          </div>
        </div>
      ))}</div>
      <Modal isOpen={showCreate} onClose={()=>setShowCreate(false)} title="모델 등록" size="md">
        <div className="space-y-4">
          <div><label className="block text-sm font-medium mb-1">모델명</label><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="모델 이름" className="w-full border rounded-lg px-3 py-2 text-sm"/></div>
          <div className="grid grid-cols-3 gap-4">
            <div><label className="block text-sm font-medium mb-1">파라미터</label><select value={form.param} onChange={e=>setForm({...form,param:e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm"><option>7B</option><option>13B</option><option>30B</option><option>70B</option><option>120B</option></select></div>
            <div><label className="block text-sm font-medium mb-1">문맥 길이</label><select value={form.context} onChange={e=>setForm({...form,context:e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm"><option>4K</option><option>8K</option><option>32K</option><option>128K</option></select></div>
            <div><label className="block text-sm font-medium mb-1">양자화</label><select value={form.quant} onChange={e=>setForm({...form,quant:e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm"><option>FP16</option><option>INT8</option><option>INT4</option><option>GPTQ</option><option>AWQ</option></select></div>
          </div>
          <button onClick={()=>{if(!form.name)return;setModels(p=>[{id:`model-${Date.now()}`,name:form.name,param:form.param,context:form.context,quant:form.quant,loaded:'-',status:'Stopped'},...p]);setShowCreate(false);setForm({name:'',param:'7B',context:'4K',quant:'FP16'});toast('모델이 등록되었습니다');}} className="w-full bg-gray-800 text-white py-2.5 rounded-lg font-medium text-sm">등록</button>
        </div>
      </Modal>
      <Modal isOpen={!!detail} onClose={()=>setDetail(null)} title={detail?.name} size="lg">
        {detail&&<div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">{[['파라미터',detail.param],['문맥 길이',detail.context],['양자화',detail.quant],['로드 노드',detail.loaded],['상태',detail.status],['ID',detail.id]].map(([k,v],i)=>(
            <div key={i} className="bg-gray-50 p-3 rounded-lg"><div className="text-xs text-gray-400">{k}</div><div className="font-medium">{v}</div></div>
          ))}</div>
        </div>}
      </Modal>
      <ConfirmDialog isOpen={!!confirmAction} onClose={()=>setConfirmAction(null)} onConfirm={()=>{const{model,action}=confirmAction;setModels(p=>p.map(x=>x.id===model.id?{...x,status:action==='load'?'Running':'Stopped',loaded:action==='load'?'gpu-node-01':'-'}:x));setConfirmAction(null);toast(action==='load'?`${model.name} 로드 완료`:`${model.name} 언로드 완료`,action==='load'?'success':'info');}} title={confirmAction?.action==='load'?'모델 로드':'모델 언로드'} message={`${confirmAction?.model?.name}을(를) ${confirmAction?.action==='load'?'로드':'언로드'}하시겠습니까?`} confirmText={confirmAction?.action==='load'?'로드':'언로드'}/>
    </PageShell>
  );
};

const LlmTraining = () => {
  const toast=useToast();
  const [jobs,setJobs]=useState([
    {id:'JOB-992',model:'GPT-OSS-120B',method:'LoRA',dataset:'Maintenance_Manual',progress:45,status:'학습 중',lr:'2e-4',epochs:'3/10',batch:32,gpu:'A100 x8'},
    {id:'JOB-991',model:'Llama-3-Kor',method:'QLoRA',dataset:'Safety_QA_v1',progress:100,status:'학습 완료',lr:'3e-4',epochs:'10/10',batch:16,gpu:'A100 x4'},
    {id:'JOB-989',model:'EXAONE-3.0',method:'Full-FT',dataset:'Finance_Report',progress:0,status:'오류 발생',lr:'1e-5',epochs:'0/5',batch:8,gpu:'A100 x8'},
  ]);
  const [showCreate,setShowCreate]=useState(false);const [detail,setDetail]=useState(null);const [confirmStop,setConfirmStop]=useState(null);
  const [form,setForm]=useState({model:'Llama-3-Kor',method:'QLoRA',dataset:'',lr:'2e-4',epochs:10,batch:16,gpu:'A100 x4'});
  return (
    <PageShell breadcrumb={['트레이너','LLM']} title="LLM 학습 관리" action={<button onClick={()=>setShowCreate(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center"><Plus size={16} className="mr-1"/>새 학습 작업</button>}>
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm"><thead className="bg-gray-50 text-xs text-gray-500 uppercase"><tr>
          <th className="px-4 py-3 text-left">Job ID</th><th className="px-4 py-3 text-left">모델</th><th className="px-4 py-3 text-left">방법</th><th className="px-4 py-3 text-left">데이터셋</th><th className="px-4 py-3 text-left">진행률</th><th className="px-4 py-3 text-left">상태</th><th className="px-4 py-3 text-center">액션</th>
        </tr></thead><tbody className="divide-y">{jobs.map(j=>(
          <tr key={j.id} className="hover:bg-gray-50 cursor-pointer" onClick={()=>setDetail(j)}>
            <td className="px-4 py-3 font-mono text-xs">{j.id}</td><td className="px-4 py-3 font-medium">{j.model}</td><td className="px-4 py-3">{j.method}</td><td className="px-4 py-3 text-gray-500">{j.dataset}</td>
            <td className="px-4 py-3"><div className="flex items-center space-x-2"><div className="w-full bg-gray-200 rounded-full h-1.5"><div className={`h-1.5 rounded-full ${j.status==='오류 발생'?'bg-red-500':j.status==='학습 중'?'bg-blue-500 animate-pulse':'bg-green-500'}`} style={{width:`${j.progress}%`}}/></div><span className="text-xs w-8">{j.progress}%</span></div></td>
            <td className="px-4 py-3"><StatusBadge status={j.status}/></td>
            <td className="px-4 py-3 text-center" onClick={e=>e.stopPropagation()}>
              {j.status==='학습 중'&&<button onClick={()=>setConfirmStop(j)} className="text-xs text-red-500 hover:underline">중지</button>}
              {j.status==='오류 발생'&&<button onClick={()=>{setJobs(p=>p.map(x=>x.id===j.id?{...x,status:'학습 중',progress:1}:x));toast('재학습을 시작합니다');}} className="text-xs text-blue-600 hover:underline">재시도</button>}
            </td>
          </tr>
        ))}</tbody></table>
      </div>
      <Modal isOpen={showCreate} onClose={()=>setShowCreate(false)} title="새 LLM 학습 작업" size="lg">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium mb-1">모델</label><select value={form.model} onChange={e=>setForm({...form,model:e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm"><option>Llama-3-Kor</option><option>GPT-OSS-120B</option><option>EXAONE-3.0</option><option>Solar-10.7B</option><option>Gemma-2-9B</option></select></div>
            <div><label className="block text-sm font-medium mb-1">학습 방법</label><select value={form.method} onChange={e=>setForm({...form,method:e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm"><option>QLoRA</option><option>LoRA</option><option>Full-FT</option><option>DPO</option><option>RLHF</option></select></div>
          </div>
          <div><label className="block text-sm font-medium mb-1">데이터셋</label><input value={form.dataset} onChange={e=>setForm({...form,dataset:e.target.value})} placeholder="데이터셋 이름" className="w-full border rounded-lg px-3 py-2 text-sm"/></div>
          <div className="grid grid-cols-4 gap-4">
            <div><label className="block text-sm font-medium mb-1">Learning Rate</label><input value={form.lr} onChange={e=>setForm({...form,lr:e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm font-mono"/></div>
            <div><label className="block text-sm font-medium mb-1">에폭</label><input type="number" value={form.epochs} onChange={e=>setForm({...form,epochs:e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm"/></div>
            <div><label className="block text-sm font-medium mb-1">배치 크기</label><select value={form.batch} onChange={e=>setForm({...form,batch:+e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm"><option>8</option><option>16</option><option>32</option><option>64</option></select></div>
            <div><label className="block text-sm font-medium mb-1">GPU</label><select value={form.gpu} onChange={e=>setForm({...form,gpu:e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm"><option>A100 x2</option><option>A100 x4</option><option>A100 x8</option></select></div>
          </div>
          <button onClick={()=>{setJobs(p=>[{id:`JOB-${993+p.length}`,model:form.model,method:form.method,dataset:form.dataset||'Custom',progress:0,status:'대기 중',lr:form.lr,epochs:`0/${form.epochs}`,batch:form.batch,gpu:form.gpu},...p]);setShowCreate(false);toast('학습 작업이 생성되었습니다');}} className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium text-sm">생성</button>
        </div>
      </Modal>
      <Modal isOpen={!!detail} onClose={()=>setDetail(null)} title={`${detail?.id} 상세`} size="lg">
        {detail&&<div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">{[['모델',detail.model],['방법',detail.method],['데이터셋',detail.dataset],['Learning Rate',detail.lr],['에폭',detail.epochs],['배치 크기',detail.batch],['GPU',detail.gpu],['진행률',`${detail.progress}%`]].map(([k,v],i)=>(
            <div key={i} className="bg-gray-50 p-3 rounded-lg"><div className="text-xs text-gray-400">{k}</div><div className="font-medium">{v}</div></div>
          ))}</div>
          <div><StatusBadge status={detail.status}/></div>
        </div>}
      </Modal>
      <ConfirmDialog isOpen={!!confirmStop} onClose={()=>setConfirmStop(null)} onConfirm={()=>{setJobs(p=>p.map(x=>x.id===confirmStop.id?{...x,status:'중지됨'}:x));setConfirmStop(null);toast('학습이 중지되었습니다','info');}} title="학습 중지" message={`${confirmStop?.id} 작업을 중지하시겠습니까?`} confirmText="중지" danger/>
    </PageShell>
  );
};

const VlmTraining = () => {
  const toast=useToast();
  const [jobs,setJobs]=useState([
    {id:'VLM-101',model:'LLaVA-1.6-13B',resolution:'336x336',epochs:'10/10',progress:100,status:'학습 완료',dataset:'KOGAS_Image_QA',gpu:'A100 x2',created:'2026-02-08'},
    {id:'VLM-102',model:'InternVL-2-8B',resolution:'448x448',epochs:'4/20',progress:20,status:'학습 중',dataset:'Safety_Image_v2',gpu:'A100 x4',created:'2026-02-10'},
    {id:'VLM-103',model:'Qwen-VL-Chat',resolution:'224x224',epochs:'0/15',progress:0,status:'대기 중',dataset:'Equipment_Manual_Img',gpu:'A100 x2',created:'2026-02-11'},
  ]);
  const [showCreate,setShowCreate]=useState(false);const [detail,setDetail]=useState(null);
  const [form,setForm]=useState({model:'LLaVA-1.6-13B',resolution:'336x336',epochs:10,dataset:'',gpu:'A100 x2'});
  return (
    <PageShell breadcrumb={['트레이너','VLM']} title="시각 언어 모델 (VLM) 학습" action={<button onClick={()=>setShowCreate(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center"><Plus size={16} className="mr-1"/>새 학습 작업</button>}>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[{l:'전체 작업',v:jobs.length,c:'bg-blue-50 text-blue-700'},{l:'학습 중',v:jobs.filter(j=>j.status==='학습 중').length,c:'bg-green-50 text-green-700'},{l:'완료',v:jobs.filter(j=>j.status==='학습 완료').length,c:'bg-purple-50 text-purple-700'}].map((s,i)=>(
          <div key={i} className={`p-4 rounded-xl ${s.c}`}><div className="text-2xl font-bold">{s.v}</div><div className="text-xs mt-1 opacity-80">{s.l}</div></div>
        ))}
      </div>
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm"><thead className="bg-gray-50 text-xs text-gray-500 uppercase"><tr>
          <th className="px-4 py-3 text-left">Job ID</th><th className="px-4 py-3 text-left">모델</th><th className="px-4 py-3 text-left">해상도</th><th className="px-4 py-3 text-left">에폭</th><th className="px-4 py-3 text-left">진행률</th><th className="px-4 py-3 text-left">상태</th><th className="px-4 py-3 text-center">액션</th>
        </tr></thead><tbody className="divide-y">{jobs.map(j=>(
          <tr key={j.id} className="hover:bg-gray-50 cursor-pointer" onClick={()=>setDetail(j)}>
            <td className="px-4 py-3 font-mono text-xs">{j.id}</td><td className="px-4 py-3 font-medium">{j.model}</td><td className="px-4 py-3">{j.resolution}</td><td className="px-4 py-3">{j.epochs}</td>
            <td className="px-4 py-3"><div className="flex items-center space-x-2"><div className="w-full bg-gray-200 rounded-full h-1.5"><div className={`h-1.5 rounded-full ${j.status==='학습 완료'?'bg-green-500':j.status==='학습 중'?'bg-blue-500 animate-pulse':'bg-gray-400'}`} style={{width:`${j.progress}%`}}/></div><span className="text-xs text-gray-500 w-8">{j.progress}%</span></div></td>
            <td className="px-4 py-3"><StatusBadge status={j.status}/></td>
            <td className="px-4 py-3 text-center" onClick={e=>e.stopPropagation()}>{j.status==='학습 중'&&<button onClick={()=>{setJobs(p=>p.map(x=>x.id===j.id?{...x,status:'중지됨'}:x));toast('학습이 중지되었습니다','info');}} className="text-xs text-red-500 hover:underline">중지</button>}{j.status==='대기 중'&&<button onClick={()=>{setJobs(p=>p.map(x=>x.id===j.id?{...x,status:'학습 중',progress:5}:x));toast('학습이 시작되었습니다');}} className="text-xs text-blue-600 hover:underline">시작</button>}</td>
          </tr>
        ))}</tbody></table>
      </div>
      <Modal isOpen={showCreate} onClose={()=>setShowCreate(false)} title="새 VLM 학습 작업" size="md">
        <div className="space-y-4">
          <div><label className="block text-sm font-medium mb-1">모델</label><select value={form.model} onChange={e=>setForm({...form,model:e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm"><option>LLaVA-1.6-13B</option><option>InternVL-2-8B</option><option>Qwen-VL-Chat</option></select></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium mb-1">해상도</label><select value={form.resolution} onChange={e=>setForm({...form,resolution:e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm"><option>224x224</option><option>336x336</option><option>448x448</option></select></div>
            <div><label className="block text-sm font-medium mb-1">에폭 수</label><input type="number" value={form.epochs} onChange={e=>setForm({...form,epochs:e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm"/></div>
          </div>
          <div><label className="block text-sm font-medium mb-1">데이터셋</label><input value={form.dataset} onChange={e=>setForm({...form,dataset:e.target.value})} placeholder="데이터셋 이름" className="w-full border rounded-lg px-3 py-2 text-sm"/></div>
          <div><label className="block text-sm font-medium mb-1">GPU</label><select value={form.gpu} onChange={e=>setForm({...form,gpu:e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm"><option>A100 x2</option><option>A100 x4</option><option>A100 x8</option></select></div>
          <button onClick={()=>{const nj={id:`VLM-${104+jobs.length}`,model:form.model,resolution:form.resolution,epochs:`0/${form.epochs}`,progress:0,status:'대기 중',dataset:form.dataset||'Custom',gpu:form.gpu,created:'2026-02-11'};setJobs(p=>[nj,...p]);setShowCreate(false);toast('VLM 학습 작업이 생성되었습니다');}} className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium text-sm">생성</button>
        </div>
      </Modal>
      <Modal isOpen={!!detail} onClose={()=>setDetail(null)} title={`${detail?.id} 상세 정보`} size="lg">
        {detail&&<div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">{[['모델',detail.model],['해상도',detail.resolution],['에폭',detail.epochs],['GPU',detail.gpu],['데이터셋',detail.dataset],['생성일',detail.created]].map(([k,v],i)=>(
            <div key={i} className="bg-gray-50 p-3 rounded-lg"><div className="text-xs text-gray-400">{k}</div><div className="font-medium">{v}</div></div>
          ))}</div>
          <div className="bg-gray-50 p-4 rounded-lg"><div className="flex justify-between mb-2"><span className="text-sm font-medium">학습 진행률</span><span className="text-sm font-bold text-blue-600">{detail.progress}%</span></div>
            <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-blue-500 h-2 rounded-full" style={{width:`${detail.progress}%`}}/></div></div>
          <div><StatusBadge status={detail.status}/></div>
        </div>}
      </Modal>
    </PageShell>
  );
};

const EmbeddingPage = () => {
  const toast=useToast();
  const [jobs,setJobs]=useState(MOCK_EMBEDDING_JOBS.map(j=>({...j})));
  const [search,setSearch]=useState('');const [detail,setDetail]=useState(null);const [showCreate,setShowCreate]=useState(false);
  const [form,setForm]=useState({name:'',plan:'Fine-Tune',gpu:'A100 x1'});
  const filtered=jobs.filter(j=>j.name.toLowerCase().includes(search.toLowerCase())||j.creator.includes(search));
  return (
    <PageShell breadcrumb={['트레이너','임베딩']}>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold">학습 임베딩 목록</h2>
        <button onClick={()=>setShowCreate(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center"><Plus size={16} className="mr-1"/>학습 임베딩 생성</button>
      </div>
      <div className="flex items-center space-x-2 mb-4">
        <select className="border rounded-lg px-3 py-2 text-sm bg-white"><option>제목</option><option>제작자</option></select>
        <div className="relative flex-1 max-w-xs"><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="검색어를 입력해 주세요" className="pl-9 pr-3 py-2 border rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"/><Search size={16} className="absolute left-3 top-2.5 text-gray-400"/></div>
      </div>
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm"><thead className="bg-gray-50 text-xs text-gray-500"><tr>
          <th className="px-4 py-3 text-left">ID</th><th className="px-4 py-3 text-left">제목</th><th className="px-4 py-3 text-left">유형</th>
          <th className="px-4 py-3 text-left">제작자</th><th className="px-4 py-3 text-left">관리 그룹</th><th className="px-4 py-3 text-left">등록일시</th>
          <th className="px-4 py-3 text-left">GPU</th><th className="px-4 py-3 text-center">텐서보드</th><th className="px-4 py-3 text-center">학습 상태</th><th className="px-4 py-3 text-center">액션</th>
        </tr></thead><tbody className="divide-y">{filtered.map(j=>(
          <tr key={j.id} className="hover:bg-gray-50 cursor-pointer" onClick={()=>setDetail(j)}>
            <td className="px-4 py-3 text-gray-500">{j.id}</td><td className="px-4 py-3 font-medium">{j.name}</td><td className="px-4 py-3 text-gray-500">{j.plan}</td>
            <td className="px-4 py-3"><div className="font-medium">{j.creator}</div><div className="text-xs text-gray-400">admin</div></td>
            <td className="px-4 py-3">{j.dept}</td><td className="px-4 py-3 text-gray-500 text-xs font-mono">{j.date}</td>
            <td className="px-4 py-3 text-xs">{j.gpu}</td>
            <td className="px-4 py-3 text-center"><span className={`inline-flex items-center text-xs ${j.tbStatus==='실행 중'?'text-green-600':'text-gray-400'}`}><span className={`w-1.5 h-1.5 rounded-full mr-1 ${j.tbStatus==='실행 중'?'bg-green-500':'bg-gray-400'}`}/>{j.tbStatus}</span></td>
            <td className="px-4 py-3 text-center"><StatusBadge status={j.status}/></td>
            <td className="px-4 py-3 text-center" onClick={e=>e.stopPropagation()}>
              {j.status==='학습 중'&&<button onClick={()=>{setJobs(p=>p.map(x=>x.id===j.id?{...x,status:'중지됨'}:x));toast('학습이 중지되었습니다','info');}} className="text-xs text-red-500 hover:underline">중지</button>}
              {(j.status==='학습 완료'||j.tbStatus==='실행 중')&&<button onClick={()=>toast('텐서보드를 엽니다')} className="text-xs text-blue-600 hover:underline">텐서보드</button>}
            </td>
          </tr>
        ))}</tbody></table>
      </div>
      <Modal isOpen={showCreate} onClose={()=>setShowCreate(false)} title="학습 임베딩 생성" size="md">
        <div className="space-y-4">
          <div><label className="block text-sm font-medium mb-1">제목</label><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm"/></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium mb-1">유형</label><select value={form.plan} onChange={e=>setForm({...form,plan:e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm"><option>Fine-Tune</option><option>Pre-Train</option><option>Distillation</option></select></div>
            <div><label className="block text-sm font-medium mb-1">GPU</label><select value={form.gpu} onChange={e=>setForm({...form,gpu:e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm"><option>A100 x1</option><option>A100 x2</option><option>A100 x4</option></select></div>
          </div>
          <button onClick={()=>{if(!form.name)return;setJobs(p=>[{id:p.length+1,name:form.name,plan:form.plan,creator:'김영빈',dept:'AI활용추진반',date:'2026-02-11',gpu:form.gpu,tbStatus:'정지',status:'대기 중'},...p]);setShowCreate(false);setForm({name:'',plan:'Fine-Tune',gpu:'A100 x1'});toast('임베딩 학습이 생성되었습니다');}} className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium text-sm">생성</button>
        </div>
      </Modal>
      <Modal isOpen={!!detail} onClose={()=>setDetail(null)} title={detail?.name} size="lg">
        {detail&&<div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">{[['유형',detail.plan],['제작자',detail.creator],['관리 그룹',detail.dept],['GPU',detail.gpu],['등록일',detail.date],['텐서보드',detail.tbStatus]].map(([k,v],i)=>(
            <div key={i} className="bg-gray-50 p-3 rounded-lg"><div className="text-xs text-gray-400">{k}</div><div className="font-medium">{v}</div></div>
          ))}</div>
          <div><StatusBadge status={detail.status}/></div>
        </div>}
      </Modal>
    </PageShell>
  );
};

const RerankingPage = () => {
  const toast=useToast();
  const [models,setModels]=useState([
    {id:1,name:'BGE-Reranker-v2',desc:'BAAI 기반 한국어 리랭킹 모델',topK:5,threshold:0.7,active:true,accuracy:92.4,latency:'15ms'},
    {id:2,name:'Cross-Encoder-KoE5',desc:'한국어 특화 Cross-Encoder',topK:3,threshold:0.8,active:true,accuracy:89.1,latency:'22ms'},
    {id:3,name:'ColBERT-v2-Kor',desc:'ColBERT 기반 다단계 리랭킹',topK:10,threshold:0.6,active:false,accuracy:87.5,latency:'35ms'},
  ]);
  const [showAdd,setShowAdd]=useState(false);const [editModel,setEditModel]=useState(null);
  const [form,setForm]=useState({name:'',desc:'',topK:5,threshold:0.7});
  return (
    <PageShell breadcrumb={['트레이너','리랭킹']} title="Cross-Encoder 리랭킹 학습" action={<button onClick={()=>setShowAdd(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center"><Plus size={16} className="mr-1"/>모델 추가</button>}>
      <div className="grid grid-cols-3 gap-4">
        {models.map(m=>(
          <div key={m.id} className={`bg-white p-5 rounded-xl border ${m.active?'border-blue-200':'border-gray-200 opacity-70'} transition-all`}>
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-bold text-sm">{m.name}</h3>
              <ToggleSwitch on={m.active} onClick={()=>{setModels(p=>p.map(x=>x.id===m.id?{...x,active:!x.active}:x));toast(m.active?`${m.name} 비활성화됨`:`${m.name} 활성화됨`,m.active?'info':'success');}}/>
            </div>
            <p className="text-xs text-gray-500 mb-3">{m.desc}</p>
            <div className="grid grid-cols-2 gap-2 text-xs mb-3">
              <div className="bg-gray-50 p-2 rounded"><span className="text-gray-400">Top-K: </span><span className="font-bold">{m.topK}</span></div>
              <div className="bg-gray-50 p-2 rounded"><span className="text-gray-400">임계값: </span><span className="font-bold">{m.threshold}</span></div>
              <div className="bg-blue-50 p-2 rounded"><span className="text-blue-400">정확도: </span><span className="font-bold text-blue-700">{m.accuracy}%</span></div>
              <div className="bg-green-50 p-2 rounded"><span className="text-green-400">지연: </span><span className="font-bold text-green-700">{m.latency}</span></div>
            </div>
            <button onClick={()=>setEditModel(m)} className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-medium text-xs hover:bg-gray-200 transition-colors">설정 변경</button>
          </div>
        ))}
      </div>
      <Modal isOpen={showAdd} onClose={()=>setShowAdd(false)} title="리랭킹 모델 추가" size="md">
        <div className="space-y-4">
          <div><label className="block text-sm font-medium mb-1">모델명</label><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm"/></div>
          <div><label className="block text-sm font-medium mb-1">설명</label><input value={form.desc} onChange={e=>setForm({...form,desc:e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm"/></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium mb-1">Top-K</label><input type="number" value={form.topK} onChange={e=>setForm({...form,topK:+e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm"/></div>
            <div><label className="block text-sm font-medium mb-1">임계값</label><input type="number" step="0.1" value={form.threshold} onChange={e=>setForm({...form,threshold:+e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm"/></div>
          </div>
          <button onClick={()=>{if(!form.name)return;setModels(p=>[...p,{id:Date.now(),name:form.name,desc:form.desc,topK:form.topK,threshold:form.threshold,active:true,accuracy:0,latency:'-'}]);setShowAdd(false);setForm({name:'',desc:'',topK:5,threshold:0.7});toast('리랭킹 모델이 추가되었습니다');}} className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium text-sm">추가</button>
        </div>
      </Modal>
      <Modal isOpen={!!editModel} onClose={()=>setEditModel(null)} title={`${editModel?.name} 설정`} size="md">
        {editModel&&<div className="space-y-4">
          <div><label className="block text-sm font-medium mb-1">Top-K</label><input type="number" value={editModel.topK} onChange={e=>setEditModel({...editModel,topK:+e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm"/></div>
          <div><label className="block text-sm font-medium mb-1">임계값 (Threshold)</label><input type="number" step="0.05" value={editModel.threshold} onChange={e=>setEditModel({...editModel,threshold:+e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm"/></div>
          <button onClick={()=>{setModels(p=>p.map(x=>x.id===editModel.id?{...x,topK:editModel.topK,threshold:editModel.threshold}:x));setEditModel(null);toast('설정이 저장되었습니다');}} className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium text-sm">저장</button>
        </div>}
      </Modal>
    </PageShell>
  );
};

const LeaderboardPage = () => {
  const toast=useToast();
  const data=[{r:1,m:'GPT-OSS-120B',a:82.4,b:88.9,c:94.1,d:240},{r:2,m:'Llama-3-Kor-70B',a:79.1,b:85.2,c:91.5,d:120},{r:3,m:'EXAONE-3.0-7.8B',a:72.3,b:78.6,c:88.2,d:80},{r:4,m:'Solar-10.7B',a:70.5,b:76.1,c:86.9,d:95},{r:5,m:'Gemma-2-9B',a:68.2,b:74.3,c:85.1,d:75}];
  const [sortKey,setSortKey]=useState('r');const [sortAsc,setSortAsc]=useState(true);
  const sorted=[...data].sort((x,y)=>{const va=x[sortKey],vb=y[sortKey];return sortAsc?(va>vb?1:-1):(va<vb?1:-1);});
  const handleSort=k=>{if(sortKey===k)setSortAsc(!sortAsc);else{setSortKey(k);setSortAsc(k==='r'||k==='d');}};
  const arrow=k=>sortKey===k?(sortAsc?' ↑':' ↓'):'';
  return (
    <PageShell breadcrumb={['평가','리더보드']} title="모델 리더보드" action={<button onClick={()=>toast('벤치마크 실행이 시작되었습니다')} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center"><Play size={16} className="mr-1"/>벤치마크 실행</button>}>
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm"><thead className="bg-gray-50 text-xs text-gray-500 uppercase"><tr>
          <th className="px-4 py-3 text-left cursor-pointer hover:text-gray-800 select-none" onClick={()=>handleSort('r')}>순위{arrow('r')}</th>
          <th className="px-4 py-3 text-left">모델</th>
          <th className="px-4 py-3 text-right cursor-pointer hover:text-gray-800 select-none" onClick={()=>handleSort('a')}>MTEB{arrow('a')}</th>
          <th className="px-4 py-3 text-right cursor-pointer hover:text-gray-800 select-none" onClick={()=>handleSort('b')}>KorQuAD{arrow('b')}</th>
          <th className="px-4 py-3 text-right cursor-pointer hover:text-gray-800 select-none" onClick={()=>handleSort('c')}>K-Hate{arrow('c')}</th>
          <th className="px-4 py-3 text-right cursor-pointer hover:text-gray-800 select-none" onClick={()=>handleSort('d')}>Avg Latency{arrow('d')}</th>
        </tr></thead><tbody className="divide-y">{sorted.map((r,i)=>(
          <tr key={r.r} className={`hover:bg-gray-50 ${i===0?'bg-yellow-50/50':''}`}>
            <td className="px-4 py-3 font-bold">{i===0?'🥇':i===1?'🥈':i===2?'🥉':r.r}</td>
            <td className="px-4 py-3 font-medium">{r.m}</td>
            <td className="px-4 py-3 text-right font-bold text-blue-600">{r.a}</td>
            <td className="px-4 py-3 text-right">{r.b}</td>
            <td className="px-4 py-3 text-right">{r.c}</td>
            <td className="px-4 py-3 text-right text-gray-500">{r.d}ms</td>
          </tr>
        ))}</tbody></table>
      </div>
    </PageShell>
  );
};

const EvalMetricsPage = () => {
  const toast=useToast();const [detail,setDetail]=useState(null);
  const evals=[
    {id:'EVAL-001',model:'GPT-OSS-120B',benchmark:'MTEB',score:82.4,samples:5000,date:'2026-02-10',status:'완료',duration:'4h 20m'},
    {id:'EVAL-002',model:'Llama-3-Kor-70B',benchmark:'KorQuAD',score:85.2,samples:3000,date:'2026-02-09',status:'완료',duration:'2h 15m'},
    {id:'EVAL-003',model:'EXAONE-3.0-7.8B',benchmark:'K-Hate',score:88.2,samples:2000,date:'2026-02-09',status:'완료',duration:'1h 30m'},
    {id:'EVAL-004',model:'Solar-10.7B',benchmark:'MTEB',score:70.5,samples:5000,date:'2026-02-08',status:'완료',duration:'3h 45m'},
    {id:'EVAL-005',model:'GPT-OSS-120B',benchmark:'전체',score:0,samples:10000,date:'2026-02-11',status:'실행 중',duration:'-'},
  ];
  return (
    <PageShell breadcrumb={['평가','평가지표']} title="성능 평가 지표" action={<button onClick={()=>toast('새 평가 실행이 시작되었습니다')} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center"><Play size={16} className="mr-1"/>평가 실행</button>}>
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[{l:'MTEB (검색)',v:'82.4',c:'bg-blue-50 text-blue-600'},{l:'K-Hatespeech',v:'94.1',c:'bg-green-50 text-green-600'},{l:'KorQuAD 1.0',v:'88.9',c:'bg-purple-50 text-purple-600'},{l:'평균 지연시간',v:'450ms',c:'bg-orange-50 text-orange-600'}].map((m,i)=>(
          <div key={i} className={`p-5 rounded-xl ${m.c}`}><div className="text-2xl font-bold">{m.v}</div><div className="text-xs mt-1 opacity-80">{m.l}</div></div>
        ))}
      </div>
      <h3 className="font-bold mb-3">평가 실행 기록</h3>
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm"><thead className="bg-gray-50 text-xs text-gray-500 uppercase"><tr>
          <th className="px-4 py-3 text-left">ID</th><th className="px-4 py-3 text-left">모델</th><th className="px-4 py-3 text-left">벤치마크</th><th className="px-4 py-3 text-right">점수</th><th className="px-4 py-3 text-right">샘플</th><th className="px-4 py-3 text-left">소요시간</th><th className="px-4 py-3 text-left">상태</th>
        </tr></thead><tbody className="divide-y">{evals.map(e=>(
          <tr key={e.id} className="hover:bg-gray-50 cursor-pointer" onClick={()=>setDetail(e)}>
            <td className="px-4 py-3 font-mono text-xs">{e.id}</td><td className="px-4 py-3 font-medium">{e.model}</td><td className="px-4 py-3">{e.benchmark}</td>
            <td className="px-4 py-3 text-right font-bold text-blue-600">{e.score||'-'}</td><td className="px-4 py-3 text-right">{e.samples.toLocaleString()}</td>
            <td className="px-4 py-3 text-gray-500">{e.duration}</td><td className="px-4 py-3"><StatusBadge status={e.status}/></td>
          </tr>
        ))}</tbody></table>
      </div>
      <Modal isOpen={!!detail} onClose={()=>setDetail(null)} title={`${detail?.id} 평가 상세`} size="lg">
        {detail&&<div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">{[['모델',detail.model],['벤치마크',detail.benchmark],['점수',detail.score||'진행 중'],['샘플 수',detail.samples.toLocaleString()],['소요시간',detail.duration],['실행일',detail.date]].map(([k,v],i)=>(
            <div key={i} className="bg-gray-50 p-3 rounded-lg"><div className="text-xs text-gray-400">{k}</div><div className="font-medium">{v}</div></div>
          ))}</div>
          <div><StatusBadge status={detail.status}/></div>
        </div>}
      </Modal>
    </PageShell>
  );
};

const GuardrailFilterPage = () => {
  const toast=useToast();
  const [rules,setRules]=useState([
    {id:1,n:'기밀정보 요청',p:'기밀, 보안등급, 내부전용',a:'차단',active:true},
    {id:2,n:'개인정보 접근',p:'급여, 주민번호, 연봉',a:'차단',active:true},
    {id:3,n:'경쟁정보 수집',p:'경쟁사, 입찰가, 내부가격',a:'차단',active:true},
    {id:4,n:'보안 우회 시도',p:'우회, 해킹, 탈옥',a:'차단',active:true},
    {id:5,n:'비윤리적 요청',p:'차별, 혐오, 폭력',a:'차단',active:true},
  ]);
  const [showAdd,setShowAdd]=useState(false);const [editRule,setEditRule]=useState(null);const [confirmDel,setConfirmDel]=useState(null);
  const [form,setForm]=useState({name:'',pattern:'',action:'차단'});
  return (
    <PageShell breadcrumb={['가드레일','필터 설정']} title="부적절 프롬프트 필터링 관리" action={<button onClick={()=>setShowAdd(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center"><Plus size={16} className="mr-1"/>필터 추가</button>}>
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm"><thead className="bg-gray-50 text-xs text-gray-500 uppercase"><tr>
          <th className="px-4 py-3 text-left">규칙명</th><th className="px-4 py-3 text-left">패턴/키워드</th><th className="px-4 py-3 text-left">동작</th><th className="px-4 py-3 text-center">활성</th><th className="px-4 py-3 text-center">액션</th>
        </tr></thead><tbody className="divide-y">{rules.map(f=>(
          <tr key={f.id} className={`hover:bg-gray-50 ${!f.active?'opacity-50':''}`}>
            <td className="px-4 py-3 font-medium">{f.n}</td><td className="px-4 py-3 text-gray-500">{f.p}</td><td className="px-4 py-3"><StatusBadge status={f.a}/></td>
            <td className="px-4 py-3 text-center"><ToggleSwitch on={f.active} onClick={()=>{setRules(p=>p.map(x=>x.id===f.id?{...x,active:!x.active}:x));toast(f.active?`${f.n} 비활성화`:`${f.n} 활성화`,f.active?'info':'success');}}/></td>
            <td className="px-4 py-3 text-center space-x-2">
              <button onClick={()=>setEditRule({...f})} className="text-xs text-blue-600 hover:underline">편집</button>
              <button onClick={()=>setConfirmDel(f)} className="text-xs text-red-500 hover:underline">삭제</button>
            </td>
          </tr>
        ))}</tbody></table>
      </div>
      <Modal isOpen={showAdd} onClose={()=>setShowAdd(false)} title="필터 규칙 추가" size="md">
        <div className="space-y-4">
          <div><label className="block text-sm font-medium mb-1">규칙명</label><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm"/></div>
          <div><label className="block text-sm font-medium mb-1">패턴/키워드 (쉼표 구분)</label><input value={form.pattern} onChange={e=>setForm({...form,pattern:e.target.value})} placeholder="키워드1, 키워드2, ..." className="w-full border rounded-lg px-3 py-2 text-sm"/></div>
          <div><label className="block text-sm font-medium mb-1">동작</label><select value={form.action} onChange={e=>setForm({...form,action:e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm"><option>차단</option><option>경고</option><option>로그만</option></select></div>
          <button onClick={()=>{if(!form.name)return;setRules(p=>[...p,{id:Date.now(),n:form.name,p:form.pattern,a:form.action,active:true}]);setShowAdd(false);setForm({name:'',pattern:'',action:'차단'});toast('필터 규칙이 추가되었습니다');}} className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium text-sm">추가</button>
        </div>
      </Modal>
      <Modal isOpen={!!editRule} onClose={()=>setEditRule(null)} title="필터 규칙 편집" size="md">
        {editRule&&<div className="space-y-4">
          <div><label className="block text-sm font-medium mb-1">규칙명</label><input value={editRule.n} onChange={e=>setEditRule({...editRule,n:e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm"/></div>
          <div><label className="block text-sm font-medium mb-1">패턴/키워드</label><input value={editRule.p} onChange={e=>setEditRule({...editRule,p:e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm"/></div>
          <div><label className="block text-sm font-medium mb-1">동작</label><select value={editRule.a} onChange={e=>setEditRule({...editRule,a:e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm"><option>차단</option><option>경고</option><option>로그만</option></select></div>
          <button onClick={()=>{setRules(p=>p.map(x=>x.id===editRule.id?{...x,n:editRule.n,p:editRule.p,a:editRule.a}:x));setEditRule(null);toast('규칙이 수정되었습니다');}} className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium text-sm">저장</button>
        </div>}
      </Modal>
      <ConfirmDialog isOpen={!!confirmDel} onClose={()=>setConfirmDel(null)} onConfirm={()=>{setRules(p=>p.filter(x=>x.id!==confirmDel.id));setConfirmDel(null);toast('규칙이 삭제되었습니다','info');}} title="규칙 삭제" message={`'${confirmDel?.n}' 규칙을 삭제하시겠습니까?`} confirmText="삭제" danger/>
    </PageShell>
  );
};

const GuardrailLogPage = () => {
  const [search,setSearch]=useState('');const [filterRule,setFilterRule]=useState('전체');const [detail,setDetail]=useState(null);
  const logs=MOCK_GUARDRAIL_LOGS.filter(l=>{
    const matchSearch=!search||l.user.includes(search)||l.query.includes(search);
    const matchRule=filterRule==='전체'||l.rule===filterRule;
    return matchSearch&&matchRule;
  });
  const rules=[...new Set(MOCK_GUARDRAIL_LOGS.map(l=>l.rule))];
  return (
    <PageShell breadcrumb={['가드레일','탐지 로그']} title="탐지 로그">
      <div className="flex items-center space-x-3 mb-4">
        <div className="relative flex-1 max-w-sm"><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="사용자 또는 질의 검색..." className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/><Search size={16} className="absolute left-3 top-2.5 text-gray-400"/></div>
        <select value={filterRule} onChange={e=>setFilterRule(e.target.value)} className="border rounded-lg px-3 py-2 text-sm bg-white"><option>전체</option>{rules.map(r=><option key={r}>{r}</option>)}</select>
        <span className="text-xs text-gray-400">총 {logs.length}건</span>
      </div>
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm"><thead className="bg-gray-50 text-xs text-gray-500 uppercase"><tr>
          <th className="px-4 py-3 text-left">시간</th><th className="px-4 py-3 text-left">사용자</th><th className="px-4 py-3 text-left">질의 내용</th><th className="px-4 py-3 text-left">적용 규칙</th><th className="px-4 py-3 text-left">조치</th>
        </tr></thead><tbody className="divide-y">{logs.map(l=>(
          <tr key={l.id} className="hover:bg-gray-50 cursor-pointer" onClick={()=>setDetail(l)}>
            <td className="px-4 py-3 text-xs font-mono text-gray-500">{l.time}</td><td className="px-4 py-3 font-medium">{l.user}</td><td className="px-4 py-3 text-gray-700">{l.query}</td><td className="px-4 py-3 text-gray-500">{l.rule}</td><td className="px-4 py-3"><StatusBadge status={l.action}/></td>
          </tr>
        ))}</tbody></table>
      </div>
      <Modal isOpen={!!detail} onClose={()=>setDetail(null)} title="탐지 로그 상세" size="lg">
        {detail&&<div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">{[['사용자',detail.user],['시간',detail.time],['적용 규칙',detail.rule],['조치',detail.action]].map(([k,v],i)=>(
            <div key={i} className="bg-gray-50 p-3 rounded-lg"><div className="text-xs text-gray-400">{k}</div><div className="font-medium">{v}</div></div>
          ))}</div>
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg"><div className="text-xs text-red-400 mb-1">차단된 질의</div><p className="text-sm text-red-700">{detail.query}</p></div>
        </div>}
      </Modal>
    </PageShell>
  );
};

// ==================== DEPLOY PAGES ====================
const MCPToolsPage = () => {
  const toast=useToast();
  const [tools,setTools]=useState(MOCK_MCP_TOOLS.map(t=>({...t})));
  const [search,setSearch]=useState('');const [showCreate,setShowCreate]=useState(false);const [detail,setDetail]=useState(null);const [confirmDel,setConfirmDel]=useState(null);
  const [form,setForm]=useState({name:'',desc:'',dept:'AI활용추진반'});
  const filtered=tools.filter(t=>t.name.toLowerCase().includes(search.toLowerCase())||t.desc.includes(search));
  return (
    <PageShell breadcrumb={['도구','MCP 도구']}>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold">MCP 도구 목록</h2>
        <button onClick={()=>setShowCreate(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center"><Plus size={16} className="mr-1"/>MCP 도구 생성</button>
      </div>
      <div className="flex items-center space-x-2 mb-4">
        <div className="relative flex-1 max-w-xs"><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="도구 검색..." className="pl-9 pr-3 py-2 border rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"/><Search size={16} className="absolute left-3 top-2.5 text-gray-400"/></div>
      </div>
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm"><thead className="bg-gray-50 text-xs text-gray-500"><tr>
          <th className="px-4 py-3 text-left">ID</th><th className="px-4 py-3 text-left">제목</th><th className="px-4 py-3 text-left">상세 설명</th><th className="px-4 py-3 text-left">제작자</th><th className="px-4 py-3 text-left">관리 그룹</th><th className="px-4 py-3 text-left">등록일시</th><th className="px-4 py-3 text-center">액션</th>
        </tr></thead><tbody className="divide-y">{filtered.map(t=>(
          <tr key={t.id} className="hover:bg-gray-50 cursor-pointer" onClick={()=>setDetail(t)}>
            <td className="px-4 py-3 text-gray-500">{t.id}</td><td className="px-4 py-3 font-medium">{t.name}</td><td className="px-4 py-3 text-gray-500">{t.desc}</td>
            <td className="px-4 py-3"><div className="font-medium">{t.creator}</div><div className="text-xs text-gray-400">admin</div></td><td className="px-4 py-3">{t.dept}</td><td className="px-4 py-3 text-xs font-mono text-gray-500">{t.date}</td>
            <td className="px-4 py-3 text-center" onClick={e=>e.stopPropagation()}>
              <button onClick={()=>setConfirmDel(t)} className="text-xs text-red-500 hover:underline">삭제</button>
            </td>
          </tr>
        ))}</tbody></table>
      </div>
      <Modal isOpen={showCreate} onClose={()=>setShowCreate(false)} title="MCP 도구 생성" size="md">
        <div className="space-y-4">
          <div><label className="block text-sm font-medium mb-1">제목</label><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm"/></div>
          <div><label className="block text-sm font-medium mb-1">상세 설명</label><textarea value={form.desc} onChange={e=>setForm({...form,desc:e.target.value})} rows={3} className="w-full border rounded-lg px-3 py-2 text-sm"/></div>
          <div><label className="block text-sm font-medium mb-1">관리 그룹</label><input value={form.dept} onChange={e=>setForm({...form,dept:e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm"/></div>
          <button onClick={()=>{if(!form.name)return;setTools(p=>[{id:p.length+1,name:form.name,desc:form.desc,creator:'김영빈',dept:form.dept,date:'2026-02-11'},...p]);setShowCreate(false);setForm({name:'',desc:'',dept:'AI활용추진반'});toast('MCP 도구가 생성되었습니다');}} className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium text-sm">생성</button>
        </div>
      </Modal>
      <Modal isOpen={!!detail} onClose={()=>setDetail(null)} title={detail?.name} size="lg">
        {detail&&<div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">{[['ID',detail.id],['제작자',detail.creator],['관리 그룹',detail.dept],['등록일',detail.date]].map(([k,v],i)=>(
            <div key={i} className="bg-gray-50 p-3 rounded-lg"><div className="text-xs text-gray-400">{k}</div><div className="font-medium">{v}</div></div>
          ))}</div>
          <div className="bg-gray-50 p-4 rounded-lg"><div className="text-xs text-gray-400 mb-1">상세 설명</div><p className="text-sm">{detail.desc}</p></div>
        </div>}
      </Modal>
      <ConfirmDialog isOpen={!!confirmDel} onClose={()=>setConfirmDel(null)} onConfirm={()=>{setTools(p=>p.filter(x=>x.id!==confirmDel.id));setConfirmDel(null);toast('MCP 도구가 삭제되었습니다','info');}} title="도구 삭제" message={`'${confirmDel?.name}'을(를) 삭제하시겠습니까?`} confirmText="삭제" danger/>
    </PageShell>
  );
};

const MCPServerPage = () => {
  const toast=useToast();
  const [servers,setServers]=useState([
    {id:1,n:'Local MCP Server',u:'http://localhost:8080',t:'Search, Web Crawler',s:'Running'},
    {id:2,n:'External API Gateway',u:'https://api.kogas.or.kr/mcp',t:'ERP Connector, GW Sync',s:'Running'},
    {id:3,n:'Test Server',u:'http://192.168.10.50:3000',t:'CodeDev',s:'Stopped'},
  ]);
  const [showAdd,setShowAdd]=useState(false);const [confirmAction,setConfirmAction]=useState(null);
  const [form,setForm]=useState({name:'',url:'',tools:''});
  return (
    <PageShell breadcrumb={['도구','MCP 서버']} title="MCP 서버 관리" action={<button onClick={()=>setShowAdd(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center"><Plus size={16} className="mr-1"/>서버 추가</button>}>
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm"><thead className="bg-gray-50 text-xs text-gray-500 uppercase"><tr>
          <th className="px-4 py-3 text-left">서버명</th><th className="px-4 py-3 text-left">URL</th><th className="px-4 py-3 text-left">연결된 도구</th><th className="px-4 py-3 text-left">상태</th><th className="px-4 py-3 text-center">액션</th>
        </tr></thead><tbody className="divide-y">{servers.map(s=>(
          <tr key={s.id} className="hover:bg-gray-50"><td className="px-4 py-3 font-medium">{s.n}</td><td className="px-4 py-3 font-mono text-xs text-gray-500">{s.u}</td><td className="px-4 py-3 text-gray-500">{s.t}</td><td className="px-4 py-3"><StatusBadge status={s.s}/></td>
            <td className="px-4 py-3 text-center space-x-2">
              <button onClick={()=>toast(`${s.n} 연결 테스트 성공`)} className="text-xs text-green-600 hover:underline">테스트</button>
              <button onClick={()=>setConfirmAction({server:s,action:'restart'})} className="text-xs text-blue-600 hover:underline">재시작</button>
              <button onClick={()=>setConfirmAction({server:s,action:'delete'})} className="text-xs text-red-500 hover:underline">삭제</button>
            </td>
          </tr>
        ))}</tbody></table>
      </div>
      <Modal isOpen={showAdd} onClose={()=>setShowAdd(false)} title="MCP 서버 추가" size="md">
        <div className="space-y-4">
          <div><label className="block text-sm font-medium mb-1">서버명</label><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm"/></div>
          <div><label className="block text-sm font-medium mb-1">URL</label><input value={form.url} onChange={e=>setForm({...form,url:e.target.value})} placeholder="http://..." className="w-full border rounded-lg px-3 py-2 text-sm font-mono"/></div>
          <div><label className="block text-sm font-medium mb-1">연결 도구 (쉼표 구분)</label><input value={form.tools} onChange={e=>setForm({...form,tools:e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm"/></div>
          <button onClick={()=>{if(!form.name)return;setServers(p=>[...p,{id:Date.now(),n:form.name,u:form.url,t:form.tools,s:'Stopped'}]);setShowAdd(false);setForm({name:'',url:'',tools:''});toast('서버가 추가되었습니다');}} className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium text-sm">추가</button>
        </div>
      </Modal>
      <ConfirmDialog isOpen={!!confirmAction} onClose={()=>setConfirmAction(null)} onConfirm={()=>{const{server,action}=confirmAction;if(action==='restart'){setServers(p=>p.map(x=>x.id===server.id?{...x,s:'Restarting'}:x));setTimeout(()=>setServers(p=>p.map(x=>x.id===server.id?{...x,s:'Running'}:x)),2000);toast(`${server.n} 재시작 중...`,'info');}else{setServers(p=>p.filter(x=>x.id!==server.id));toast('서버가 삭제되었습니다','info');}setConfirmAction(null);}} title={confirmAction?.action==='restart'?'서버 재시작':'서버 삭제'} message={`${confirmAction?.server?.n}을(를) ${confirmAction?.action==='restart'?'재시작':'삭제'}하시겠습니까?`} confirmText={confirmAction?.action==='restart'?'재시작':'삭제'} danger={confirmAction?.action==='delete'}/>
    </PageShell>
  );
};

const PromptLibraryPage = () => {
  const toast=useToast();
  const [prompts,setPrompts]=useState(MOCK_PROMPTS.map(p=>({...p})));
  const [search,setSearch]=useState('');const [showCreate,setShowCreate]=useState(false);const [detail,setDetail]=useState(null);const [confirmDel,setConfirmDel]=useState(null);
  const [form,setForm]=useState({name:'',desc:'',content:'',dept:'AI활용추진반'});
  const filtered=prompts.filter(p=>p.name.toLowerCase().includes(search.toLowerCase())||p.desc.includes(search));
  return (
    <PageShell breadcrumb={['도구','프롬프트 라이브러리']}>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold">프롬프트 라이브러리</h2>
        <button onClick={()=>setShowCreate(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center"><Plus size={16} className="mr-1"/>프롬프트 생성</button>
      </div>
      <div className="relative max-w-sm mb-4"><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="프롬프트 검색..." className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/><Search size={16} className="absolute left-3 top-2.5 text-gray-400"/></div>
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm"><thead className="bg-gray-50 text-xs text-gray-500"><tr>
          <th className="px-4 py-3 text-left">ID</th><th className="px-4 py-3 text-left">제목</th><th className="px-4 py-3 text-left">설명</th><th className="px-4 py-3 text-left">관리 그룹</th><th className="px-4 py-3 text-left">등록일시</th><th className="px-4 py-3 text-center">액션</th>
        </tr></thead><tbody className="divide-y">{filtered.map(p=>(
          <tr key={p.id} className="hover:bg-gray-50 cursor-pointer" onClick={()=>setDetail(p)}>
            <td className="px-4 py-3 text-gray-500">{p.id}</td><td className="px-4 py-3 font-medium">{p.name}</td><td className="px-4 py-3 text-gray-500">{p.desc}</td><td className="px-4 py-3">{p.dept}</td><td className="px-4 py-3 text-xs font-mono text-gray-500">{p.date}</td>
            <td className="px-4 py-3 text-center" onClick={e=>e.stopPropagation()}>
              <button onClick={()=>setConfirmDel(p)} className="text-xs text-red-500 hover:underline">삭제</button>
            </td>
          </tr>
        ))}</tbody></table>
      </div>
      <Modal isOpen={showCreate} onClose={()=>setShowCreate(false)} title="프롬프트 생성" size="lg">
        <div className="space-y-4">
          <div><label className="block text-sm font-medium mb-1">제목</label><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm"/></div>
          <div><label className="block text-sm font-medium mb-1">설명</label><input value={form.desc} onChange={e=>setForm({...form,desc:e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm"/></div>
          <div><label className="block text-sm font-medium mb-1">프롬프트 내용</label><textarea value={form.content} onChange={e=>setForm({...form,content:e.target.value})} rows={5} placeholder="프롬프트 템플릿을 입력하세요..." className="w-full border rounded-lg px-3 py-2 text-sm font-mono"/></div>
          <div><label className="block text-sm font-medium mb-1">관리 그룹</label><input value={form.dept} onChange={e=>setForm({...form,dept:e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm"/></div>
          <button onClick={()=>{if(!form.name)return;setPrompts(p=>[{id:p.length+1,name:form.name,desc:form.desc,dept:form.dept,date:'2026-02-11',content:form.content},...p]);setShowCreate(false);setForm({name:'',desc:'',content:'',dept:'AI활용추진반'});toast('프롬프트가 생성되었습니다');}} className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium text-sm">생성</button>
        </div>
      </Modal>
      <Modal isOpen={!!detail} onClose={()=>setDetail(null)} title={detail?.name} size="lg">
        {detail&&<div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">{[['ID',detail.id],['관리 그룹',detail.dept],['등록일',detail.date],['설명',detail.desc]].map(([k,v],i)=>(
            <div key={i} className="bg-gray-50 p-3 rounded-lg"><div className="text-xs text-gray-400">{k}</div><div className="font-medium">{v}</div></div>
          ))}</div>
          {detail.content&&<div className="bg-gray-900 text-green-400 font-mono text-xs p-4 rounded-lg whitespace-pre-wrap">{detail.content}</div>}
        </div>}
      </Modal>
      <ConfirmDialog isOpen={!!confirmDel} onClose={()=>setConfirmDel(null)} onConfirm={()=>{setPrompts(p=>p.filter(x=>x.id!==confirmDel.id));setConfirmDel(null);toast('프롬프트가 삭제되었습니다','info');}} title="프롬프트 삭제" message={`'${confirmDel?.name}'을(를) 삭제하시겠습니까?`} confirmText="삭제" danger/>
    </PageShell>
  );
};

const ServingPage = () => {
  const toast=useToast();
  const [endpoints,setEndpoints]=useState([
    {id:1,e:'api-gpt-oss-prod',m:'GPT-OSS-120B',q:120,t:4500,l:'240ms',s:'Healthy',replicas:4},
    {id:2,e:'api-llama3-prod',m:'Llama-3-Kor',q:45,t:1800,l:'120ms',s:'Healthy',replicas:2},
    {id:3,e:'api-exaone-dev',m:'EXAONE-3.0',q:15,t:600,l:'180ms',s:'Healthy',replicas:1},
    {id:4,e:'api-solar-batch',m:'Solar-10.7B',q:80,t:3200,l:'95ms',s:'Healthy',replicas:2},
  ]);
  const [detail,setDetail]=useState(null);const [scaleEp,setScaleEp]=useState(null);const [confirmRestart,setConfirmRestart]=useState(null);
  const [newReplicas,setNewReplicas]=useState(1);
  return (
    <PageShell breadcrumb={['서빙']} title="모델 서빙 상태">
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm"><thead className="bg-gray-50 text-xs text-gray-500 uppercase"><tr>
          <th className="px-4 py-3 text-left">엔드포인트</th><th className="px-4 py-3 text-left">모델</th><th className="px-4 py-3 text-right">QPS</th><th className="px-4 py-3 text-right">Tokens/s</th><th className="px-4 py-3 text-right">지연시간</th><th className="px-4 py-3 text-center">레플리카</th><th className="px-4 py-3 text-left">상태</th><th className="px-4 py-3 text-center">액션</th>
        </tr></thead><tbody className="divide-y">{endpoints.map(r=>(
          <tr key={r.id} className="hover:bg-gray-50 cursor-pointer" onClick={()=>setDetail(r)}>
            <td className="px-4 py-3 font-bold">{r.e}</td><td className="px-4 py-3">{r.m}</td><td className="px-4 py-3 text-right">{r.q}</td><td className="px-4 py-3 text-right">{r.t.toLocaleString()}</td><td className="px-4 py-3 text-right">{r.l}</td><td className="px-4 py-3 text-center font-medium">{r.replicas}</td><td className="px-4 py-3"><StatusBadge status={r.s}/></td>
            <td className="px-4 py-3 text-center space-x-2" onClick={e=>e.stopPropagation()}>
              <button onClick={()=>{setScaleEp(r);setNewReplicas(r.replicas);}} className="text-xs text-blue-600 hover:underline">스케일</button>
              <button onClick={()=>setConfirmRestart(r)} className="text-xs text-orange-600 hover:underline">재시작</button>
            </td>
          </tr>
        ))}</tbody></table>
      </div>
      <Modal isOpen={!!detail} onClose={()=>setDetail(null)} title={detail?.e} size="lg">
        {detail&&<div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">{[['모델',detail.m],['QPS',detail.q],['Tokens/s',detail.t.toLocaleString()],['지연시간',detail.l],['레플리카',detail.replicas],['상태',detail.s]].map(([k,v],i)=>(
            <div key={i} className="bg-gray-50 p-3 rounded-lg"><div className="text-xs text-gray-400">{k}</div><div className="font-medium">{v}</div></div>
          ))}</div>
        </div>}
      </Modal>
      <Modal isOpen={!!scaleEp} onClose={()=>setScaleEp(null)} title={`${scaleEp?.e} 스케일 조정`} size="sm">
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-4">
            <button onClick={()=>setNewReplicas(Math.max(1,newReplicas-1))} className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 text-lg font-bold">-</button>
            <span className="text-3xl font-bold w-12 text-center">{newReplicas}</span>
            <button onClick={()=>setNewReplicas(newReplicas+1)} className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 text-lg font-bold">+</button>
          </div>
          <button onClick={()=>{setEndpoints(p=>p.map(x=>x.id===scaleEp.id?{...x,replicas:newReplicas}:x));setScaleEp(null);toast(`${scaleEp?.e} 레플리카가 ${newReplicas}개로 조정되었습니다`);}} className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium text-sm">적용</button>
        </div>
      </Modal>
      <ConfirmDialog isOpen={!!confirmRestart} onClose={()=>setConfirmRestart(null)} onConfirm={()=>{setEndpoints(p=>p.map(x=>x.id===confirmRestart.id?{...x,s:'Restarting'}:x));setTimeout(()=>setEndpoints(p=>p.map(x=>x.id===confirmRestart.id?{...x,s:'Healthy'}:x)),2000);setConfirmRestart(null);toast(`${confirmRestart?.e} 재시작 중...`,'info');}} title="엔드포인트 재시작" message={`${confirmRestart?.e}을(를) 재시작하시겠습니까?`} confirmText="재시작"/>
    </PageShell>
  );
};

// ==================== TOAST & CONFIRM ====================
const ToastContext = React.createContext();
const ToastProvider = ({children}) => {
  const [toasts,setToasts]=useState([]);
  const addToast=(msg,type='success')=>{const id=Date.now();setToasts(p=>[...p,{id,msg,type}]);setTimeout(()=>setToasts(p=>p.filter(t=>t.id!==id)),3000);};
  return <ToastContext.Provider value={addToast}>{children}
    <div className="fixed top-4 right-4 z-[60] space-y-2">{toasts.map(t=>(
      <div key={t.id} className={`px-4 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center space-x-2 animate-in ${t.type==='success'?'bg-green-600 text-white':t.type==='error'?'bg-red-600 text-white':t.type==='info'?'bg-blue-600 text-white':'bg-orange-500 text-white'}`}>
        {t.type==='success'&&<CheckCircle size={16}/>}{t.type==='error'&&<XCircle size={16}/>}{t.type==='info'&&<AlertCircle size={16}/>}{t.type==='warning'&&<AlertTriangle size={16}/>}
        <span>{t.msg}</span>
      </div>
    ))}</div>
  </ToastContext.Provider>;
};
const useToast=()=>React.useContext(ToastContext);

const ConfirmDialog = ({isOpen,onClose,onConfirm,title,message,confirmText='확인',danger=false}) => {
  if(!isOpen)return null;
  return (
    <div className="fixed inset-0 z-[55] flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6" onClick={e=>e.stopPropagation()}>
        <div className="flex items-center space-x-3 mb-4">{danger?<AlertTriangle size={24} className="text-red-500"/>:<AlertCircle size={24} className="text-blue-500"/>}<h3 className="font-bold text-lg">{title}</h3></div>
        <p className="text-sm text-gray-600 mb-6 ml-9">{message}</p>
        <div className="flex space-x-2 justify-end">
          <button onClick={onClose} className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50">취소</button>
          <button onClick={()=>{onConfirm();onClose();}} className={`px-4 py-2 rounded-lg text-sm font-medium text-white ${danger?'bg-red-600 hover:bg-red-700':'bg-blue-600 hover:bg-blue-700'}`}>{confirmText}</button>
        </div>
      </div>
    </div>
  );
};

// ==================== SERVICE PAGES ====================
const ToggleSwitch = ({on,label,onClick})=>(
  <div className="flex items-center space-x-2" onClick={e=>{e.stopPropagation();onClick&&onClick();}}>
    <div className={`w-9 h-5 rounded-full cursor-pointer transition-colors ${on?'bg-blue-600':'bg-gray-300'}`}><div className={`w-4 h-4 bg-white rounded-full shadow mt-0.5 transition-transform ${on?'translate-x-4.5 ml-0.5':'ml-0.5'}`}/></div>
    {label&&<span className="text-xs text-gray-500">{label}</span>}
  </div>
);

const TaskflowBuilderPage = () => {
  const toast=useToast();
  const [agents,setAgents]=useState(MOCK_AGENTS);
  const [selected,setSelected]=useState(null);
  const [tab,setTab]=useState('config');
  const [search,setSearch]=useState('');
  const [filterModel,setFilterModel]=useState('all');
  const [filterStatus,setFilterStatus]=useState('all');
  const [chatMsgs,setChatMsgs]=useState([{role:'assistant',text:'안녕하세요! 에이전트 테스트 모드입니다. 질문을 입력해 주세요.'}]);
  const [chatInput,setChatInput]=useState('');
  const [showCreateModal,setShowCreateModal]=useState(false);
  const [showDeleteConfirm,setShowDeleteConfirm]=useState(false);
  const [showDeployConfirm,setShowDeployConfirm]=useState(false);
  const [showRollbackConfirm,setShowRollbackConfirm]=useState(null);
  const [editForm,setEditForm]=useState({});
  const [newAgent,setNewAgent]=useState({name:'',desc:'',model:'GPT-OSS-120B',responseMode:'knowledge',systemPrompt:'',temperature:0.3,maxTokens:2048});
  const [hitlThreshold,setHitlThreshold]=useState(80);
  const chatEndRef=useRef(null);
  const filtered=agents.filter(a=>{
    if(search&&!a.name.includes(search)&&!a.desc.includes(search))return false;
    if(filterModel!=='all'&&a.model!==filterModel)return false;
    if(filterStatus!=='all'&&a.status!==filterStatus)return false;
    return true;
  });
  const selectAgent=(a)=>{setSelected({...a});setEditForm({name:a.name,desc:a.desc,systemPrompt:a.systemPrompt,model:a.model,temperature:a.temperature,maxTokens:a.maxTokens,responseMode:a.responseMode,mcpTools:[...a.mcpTools],ragEnabled:a.ragEnabled,hitl:a.hitl,a2a:a.a2a,actionable:a.actionable});setTab('config');setChatMsgs([{role:'assistant',text:'안녕하세요! 에이전트 테스트 모드입니다. 질문을 입력해 주세요.'}]);};
  const handleSave=()=>{setAgents(p=>p.map(a=>a.id===selected.id?{...a,...editForm,updated:new Date().toISOString().slice(0,10)}:a));setSelected(p=>({...p,...editForm}));toast('에이전트 설정이 저장되었습니다.');};
  const handleDelete=()=>{setAgents(p=>p.filter(a=>a.id!==selected.id));setSelected(null);setTab('config');toast('에이전트가 삭제되었습니다.','warning');};
  const toggleMcp=(name)=>{setEditForm(p=>{const has=p.mcpTools.includes(name);return{...p,mcpTools:has?p.mcpTools.filter(t=>t!==name):[...p.mcpTools,name]};});};
  const toggleField=(field)=>{setEditForm(p=>({...p,[field]:!p[field]}));};
  const handleCreate=()=>{if(!newAgent.name.trim()){toast('에이전트 이름을 입력하세요.','error');return;}const id='AGT-'+(agents.length+1).toString().padStart(3,'0');const now=new Date().toISOString().slice(0,10);const a={id,name:newAgent.name,desc:newAgent.desc,model:newAgent.model,tools:[],mcpTools:[],ragEnabled:false,hitl:false,a2a:false,responseMode:newAgent.responseMode,actionable:false,status:'Stopped',version:'v1.0',creator:'김영빈',dept:'AI활용 초혁신 추진반',created:now,updated:now,requests24h:0,avgLatency:'-',successRate:0,confidence:0,systemPrompt:newAgent.systemPrompt,temperature:newAgent.temperature,maxTokens:newAgent.maxTokens};setAgents(p=>[...p,a]);setShowCreateModal(false);setNewAgent({name:'',desc:'',model:'GPT-OSS-120B',responseMode:'knowledge',systemPrompt:'',temperature:0.3,maxTokens:2048});toast(`'${a.name}' 에이전트가 생성되었습니다.`);};
  const toggleAgentStatus=(id)=>{setAgents(p=>p.map(a=>a.id===id?{...a,status:a.status==='Running'?'Stopped':'Running'}:a));toast('에이전트 상태가 변경되었습니다.','info');};
  const sendChat=()=>{if(!chatInput.trim())return;const msg=chatInput;setChatMsgs(p=>[...p,{role:'user',text:msg}]);setChatInput('');setTimeout(()=>{const ef=editForm;setChatMsgs(p=>[...p,{role:'assistant',text:`[${ef.name||selected.name}] "${msg}"에 대해 ${ef.responseMode==='knowledge'?'사내 지식 DB를 참조하여':'LLM 직접 응답으로'} 답변드리겠습니다.\n\n${ef.mcpTools?.length>0?`MCP 도구 (${ef.mcpTools.join(', ')})를 활용하여 `:''}처리되었습니다.${ef.hitl?'\n\n⚠️ HITL 모드: 전문가 검토 후 최종 응답이 제공됩니다.':''}\n\n신뢰도: ${(selected.confidence*100).toFixed(0)}% | 응답 모드: ${ef.responseMode==='knowledge'?'지식 참조':'직접 응답'}`}]);setTimeout(()=>chatEndRef.current?.scrollIntoView({behavior:'smooth'}),50);},800);};
  const models=[...new Set(agents.map(a=>a.model))];
  const versionHistory=[{ver:'v2.1',change:'MCP 도구 연동 및 HITL 워크플로우 추가',author:'김세은',date:'2026-02-08'},{ver:'v2.0',change:'GPT-OSS-120B 모델로 전환, A2A 프로토콜 활성화',author:'김세은',date:'2026-01-20'},{ver:'v1.5',change:'RAG 파이프라인 연동 및 신뢰도 임계값 설정',author:'이준호',date:'2026-01-05'},{ver:'v1.0',change:'최초 에이전트 생성 (노코드 빌더)',author:'김세은',date:'2025-12-15'}];

  if(selected) return (
    <PageShell breadcrumb={['에이전트','태스크플로우','빌더',selected.name]}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <button onClick={()=>{setSelected(null);setTab('config');}} className="p-2 hover:bg-gray-100 rounded-lg"><ChevronRight size={18} className="rotate-180 text-gray-500"/></button>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${editForm.actionable?'bg-gradient-to-br from-purple-600 to-blue-600':'bg-blue-600'}`}><Bot size={20} className="text-white"/></div>
          <div><h2 className="text-lg font-bold">{editForm.name||selected.name}</h2>
            <div className="flex items-center space-x-2 mt-0.5">
              <span className="text-xs text-gray-500">{selected.id} · {selected.version}</span>
              {editForm.hitl&&<span className="bg-orange-50 text-orange-600 px-1.5 py-0.5 rounded text-[10px] font-bold">HITL</span>}
              {editForm.a2a&&<span className="bg-purple-50 text-purple-600 px-1.5 py-0.5 rounded text-[10px] font-bold">A2A</span>}
              {editForm.actionable&&<span className="bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 px-1.5 py-0.5 rounded text-[10px] font-bold">Actionable AI</span>}
            </div>
          </div>
          <StatusBadge status={selected.status}/>
        </div>
        <div className="flex space-x-2">
          <button onClick={()=>setShowDeleteConfirm(true)} className="px-4 py-2 border border-red-200 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 flex items-center space-x-1.5"><Trash2 size={15}/><span>삭제</span></button>
          <button onClick={handleSave} className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center space-x-1.5"><Save size={15}/><span>저장</span></button>
          <button onClick={()=>setShowDeployConfirm(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center space-x-1.5"><Play size={15}/><span>배포</span></button>
        </div>
      </div>
      <ConfirmDialog isOpen={showDeleteConfirm} onClose={()=>setShowDeleteConfirm(false)} onConfirm={handleDelete} title="에이전트 삭제" message={`'${selected.name}' 에이전트를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`} confirmText="삭제" danger/>
      <ConfirmDialog isOpen={showDeployConfirm} onClose={()=>setShowDeployConfirm(false)} onConfirm={()=>{handleSave();toast('에이전트가 배포 대기열에 추가되었습니다.','info');}} title="에이전트 배포" message={`'${editForm.name||selected.name}' 에이전트를 Production 환경에 배포하시겠습니까?`} confirmText="배포"/>
      <ConfirmDialog isOpen={showRollbackConfirm!==null} onClose={()=>setShowRollbackConfirm(null)} onConfirm={()=>{toast(`${versionHistory[showRollbackConfirm]?.ver} 버전으로 롤백되었습니다.`,'info');}} title="버전 롤백" message={`${versionHistory[showRollbackConfirm]?.ver} 버전으로 롤백하시겠습니까?`} confirmText="롤백" danger/>
      <div className="flex space-x-1 mb-6 border-b">
        {[['config','설정'],['tools','MCP 도구 & RAG'],['protocol','프로토콜'],['test','테스트'],['history','이력']].map(([k,l])=>(
          <button key={k} onClick={()=>setTab(k)} className={`px-5 py-2.5 text-sm font-medium border-b-2 transition-colors ${tab===k?'border-blue-600 text-blue-600':'border-transparent text-gray-500 hover:text-gray-800'}`}>{l}</button>
        ))}
      </div>

      {tab==='config'&&<div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-5">
          <div className="bg-white rounded-xl border p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-gray-800">기본 정보</h3>
            <div><label className="block text-xs font-medium text-gray-500 mb-1.5">에이전트 이름</label><input value={editForm.name||''} onChange={e=>setEditForm(p=>({...p,name:e.target.value}))} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"/></div>
            <div><label className="block text-xs font-medium text-gray-500 mb-1.5">설명</label><input value={editForm.desc||''} onChange={e=>setEditForm(p=>({...p,desc:e.target.value}))} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"/></div>
            <div><label className="block text-xs font-medium text-gray-500 mb-1.5">시스템 프롬프트</label><textarea value={editForm.systemPrompt||''} onChange={e=>setEditForm(p=>({...p,systemPrompt:e.target.value}))} className="w-full h-28 px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm font-mono bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"/></div>
          </div>
          <div className="bg-white rounded-xl border p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-gray-800">모델 설정</h3>
            <div className="grid grid-cols-3 gap-4">
              <div><label className="block text-xs font-medium text-gray-500 mb-1.5">모델</label><select value={editForm.model||''} onChange={e=>setEditForm(p=>({...p,model:e.target.value}))} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm bg-white">{MOCK_MODELS.map(m=><option key={m.id} value={m.name}>{m.name}</option>)}</select></div>
              <div><label className="block text-xs font-medium text-gray-500 mb-1.5">Temperature</label><input type="number" value={editForm.temperature??0.3} onChange={e=>setEditForm(p=>({...p,temperature:parseFloat(e.target.value)||0}))} step="0.1" min="0" max="1" className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm"/></div>
              <div><label className="block text-xs font-medium text-gray-500 mb-1.5">Max Tokens</label><input type="number" value={editForm.maxTokens||2048} onChange={e=>setEditForm(p=>({...p,maxTokens:parseInt(e.target.value)||2048}))} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm"/></div>
            </div>
          </div>
          <div className="bg-white rounded-xl border p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-gray-800">응답 모드 (SFR-011)</h3>
            <div className="grid grid-cols-2 gap-3">
              <div onClick={()=>setEditForm(p=>({...p,responseMode:'knowledge'}))} className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${editForm.responseMode==='knowledge'?'border-blue-500 bg-blue-50/50':'border-gray-200 hover:border-gray-300'}`}>
                <div className="flex items-center space-x-2 mb-2"><BookOpen size={18} className={editForm.responseMode==='knowledge'?'text-blue-600':'text-gray-400'}/><span className="font-bold text-sm">지식 참조 모드</span></div>
                <p className="text-xs text-gray-500">RAG 파이프라인을 통한 사내 문서 기반 응답. 규정·매뉴얼 등 정확한 참조가 필요한 업무에 적합.</p>
              </div>
              <div onClick={()=>setEditForm(p=>({...p,responseMode:'direct'}))} className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${editForm.responseMode==='direct'?'border-blue-500 bg-blue-50/50':'border-gray-200 hover:border-gray-300'}`}>
                <div className="flex items-center space-x-2 mb-2"><Zap size={18} className={editForm.responseMode==='direct'?'text-blue-600':'text-gray-400'}/><span className="font-bold text-sm">직접 응답 모드</span></div>
                <p className="text-xs text-gray-500">LLM 자체 지식으로 즉각 응답. 일반 질의, 번역, 요약 등 창의적 업무에 적합.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-5">
          <div className="bg-white rounded-xl border p-5 shadow-sm">
            <h3 className="font-bold text-sm text-gray-800 mb-4">에이전트 정보</h3>
            <div className="space-y-3 text-sm">{[['ID',selected.id],['생성자',selected.creator],['부서',selected.dept],['생성일',selected.created],['수정일',selected.updated]].map(([k,v],i)=>(
              <div key={i} className="flex justify-between"><span className="text-gray-400">{k}</span><span className="font-medium">{v}</span></div>
            ))}</div>
          </div>
          <div className="bg-white rounded-xl border p-5 shadow-sm">
            <h3 className="font-bold text-sm text-gray-800 mb-4">실시간 지표</h3>
            <div className="grid grid-cols-1 gap-3">
              <div className="bg-blue-50 rounded-lg p-3 text-center"><div className="text-2xl font-bold text-blue-700">{selected.requests24h}</div><div className="text-xs text-blue-500">24h 요청 수</div></div>
              <div className="bg-green-50 rounded-lg p-3 text-center"><div className="text-2xl font-bold text-green-700">{selected.avgLatency}</div><div className="text-xs text-green-500">평균 응답시간</div></div>
              <div className="bg-purple-50 rounded-lg p-3 text-center"><div className="text-2xl font-bold text-purple-700">{selected.successRate}%</div><div className="text-xs text-purple-500">성공률</div></div>
              <div className={`rounded-lg p-3 text-center ${selected.confidence>=0.9?'bg-green-50':selected.confidence>=0.7?'bg-yellow-50':'bg-red-50'}`}><div className={`text-2xl font-bold ${selected.confidence>=0.9?'text-green-700':selected.confidence>=0.7?'text-yellow-700':'text-red-700'}`}>{(selected.confidence*100).toFixed(0)}%</div><div className="text-xs text-gray-500">신뢰도</div></div>
            </div>
          </div>
        </div>
      </div>}

      {tab==='tools'&&<div className="grid grid-cols-2 gap-6">
        <div className="space-y-5">
          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <h3 className="font-bold text-sm mb-4 flex items-center"><Unplug size={16} className="mr-1.5 text-purple-600"/>MCP 도구 연결</h3>
            <p className="text-xs text-gray-500 mb-4">Model Context Protocol을 통해 외부 시스템 및 도구를 표준화된 방식으로 연동합니다.</p>
            <div className="space-y-2.5">
              {[{name:'MCP-Search',desc:'벡터 DB 시맨틱 검색'},{name:'MCP-WebSearch',desc:'외부 웹 검색 엔진'},{name:'MCP-WebCrawler',desc:'웹 페이지 크롤링'},{name:'MCP-IoTSensor',desc:'IoT 센서 실시간 데이터'},{name:'MCP-ERPConnector',desc:'ERP 시스템 연동 (SAP/Oracle)'},{name:'MCP-GWSync',desc:'그룹웨어 일정/문서 동기화'},{name:'MCP-CodeDev',desc:'코드 생성 및 실행'},{name:'MCP-DynamicFilter',desc:'동적 데이터 필터링'}].map((t,i)=>{const active=editForm.mcpTools?.includes(t.name);return(
                <div key={i} className={`flex items-center justify-between px-3.5 py-3 rounded-lg border transition-all ${active?'border-purple-200 bg-purple-50/50':'border-gray-200'}`}>
                  <div className="flex items-center space-x-2"><Unplug size={14} className={active?'text-purple-600':'text-gray-400'}/><div><div className="text-sm font-medium">{t.name}</div><div className="text-xs text-gray-400">{t.desc}</div></div></div>
                  <ToggleSwitch on={active} onClick={()=>toggleMcp(t.name)}/>
                </div>
              );})}
            </div>
            <button onClick={()=>toast('MCP 서버 마켓플레이스에서 도구를 추가합니다.','info')} className="mt-4 w-full py-2.5 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-purple-400 hover:text-purple-600 flex items-center justify-center space-x-1"><Plus size={15}/><span>MCP 서버에서 추가</span></button>
          </div>
        </div>
        <div className="space-y-5">
          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <h3 className="font-bold text-sm mb-4 flex items-center"><Database size={16} className="mr-1.5 text-blue-600"/>내부 도구 연결</h3>
            <div className="space-y-2.5">
              {[{name:'사내 규정 벡터 DB',icon:Database,desc:'안전 규정 및 매뉴얼 검색',active:true},{name:'설비 이력 DB',icon:HardDrive,desc:'설비 점검 이력 조회',active:selected.tools.includes('설비 이력 DB')},{name:'알림 서비스 API',icon:Bell,desc:'Slack/Email 알림 발송',active:selected.tools.includes('알림 서비스 API')}].map((t,i)=>(
                <div key={i} className={`flex items-center justify-between px-3.5 py-3 rounded-lg border ${t.active?'border-blue-200 bg-blue-50/50':'border-gray-200'}`}>
                  <div className="flex items-center space-x-2"><t.icon size={14} className={t.active?'text-blue-600':'text-gray-400'}/><div><div className="text-sm font-medium">{t.name}</div><div className="text-xs text-gray-400">{t.desc}</div></div></div>
                  <ToggleSwitch on={t.active} onClick={()=>toast(`${t.name} 도구 ${t.active?'비활성화':'활성화'}됨`,'info')}/>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4"><h3 className="font-bold text-sm flex items-center"><BookOpen size={16} className="mr-1.5 text-green-600"/>RAG 설정</h3><ToggleSwitch on={editForm.ragEnabled} onClick={()=>toggleField('ragEnabled')}/></div>
            {editForm.ragEnabled&&<div className="space-y-4">
              <div><label className="block text-xs font-medium text-gray-500 mb-1.5">벡터 DB 컬렉션</label><select className="w-full px-3.5 py-2.5 border rounded-lg text-sm bg-white"><option>safety_regulations_v2</option><option>maintenance_manuals</option><option>hr_policies</option></select></div>
              <div className="grid grid-cols-3 gap-3">
                <div><label className="text-xs text-gray-500">Chunk Size</label><input type="number" defaultValue={512} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"/></div>
                <div><label className="text-xs text-gray-500">Top-K</label><input type="number" defaultValue={5} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"/></div>
                <div><label className="text-xs text-gray-500">유사도</label><input type="number" defaultValue={0.75} step="0.05" className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"/></div>
              </div>
            </div>}
            {!editForm.ragEnabled&&<p className="text-xs text-gray-400">RAG를 활성화하면 벡터 DB 기반의 사내 문서 검색이 가능합니다.</p>}
          </div>
        </div>
      </div>}

      {tab==='protocol'&&<div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border p-6 shadow-sm">
          <h3 className="font-bold text-sm mb-2 flex items-center"><Users size={16} className="mr-1.5 text-orange-500"/>HITL (Human-in-the-Loop)</h3>
          <p className="text-xs text-gray-500 mb-4">신뢰도가 낮거나 중요 결정이 필요한 응답에 대해 전문가 검토를 요청합니다.</p>
          <div className="flex items-center justify-between p-4 rounded-xl bg-orange-50/50 border border-orange-200 mb-4">
            <div><span className="font-bold text-sm">HITL 모드 활성화</span><p className="text-xs text-gray-500 mt-0.5">전문가 승인 후 응답 제공</p></div>
            <ToggleSwitch on={editForm.hitl} onClick={()=>toggleField('hitl')}/>
          </div>
          {editForm.hitl&&<div className="space-y-3 pl-4 border-l-2 border-orange-300">
            <div><label className="text-xs text-gray-500">검토 요청 임계값 (신뢰도)</label><div className="flex items-center space-x-2 mt-1"><input type="range" min="50" max="95" value={hitlThreshold} onChange={e=>setHitlThreshold(+e.target.value)} className="flex-1"/><span className="text-sm font-bold text-orange-600">{hitlThreshold}%</span></div></div>
            <div><label className="text-xs text-gray-500">검토자 지정</label><select className="w-full mt-1 px-3 py-2 border rounded-lg text-sm bg-white"><option>부서 관리자 자동 배정</option><option>지정 전문가 그룹</option></select></div>
            <div><label className="text-xs text-gray-500">검토 SLA</label><select className="w-full mt-1 px-3 py-2 border rounded-lg text-sm bg-white"><option>30분 이내</option><option>1시간 이내</option><option>4시간 이내</option></select></div>
          </div>}
        </div>
        <div className="space-y-5">
          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <h3 className="font-bold text-sm mb-2 flex items-center"><GitBranch size={16} className="mr-1.5 text-purple-600"/>A2A (Agent-to-Agent)</h3>
            <p className="text-xs text-gray-500 mb-4">다른 에이전트와 협업하여 복잡한 태스크를 수행합니다.</p>
            <div className="flex items-center justify-between p-4 rounded-xl bg-purple-50/50 border border-purple-200 mb-4">
              <div><span className="font-bold text-sm">A2A 프로토콜 활성화</span><p className="text-xs text-gray-500 mt-0.5">에이전트 간 협업 통신 허용</p></div>
              <ToggleSwitch on={editForm.a2a} onClick={()=>toggleField('a2a')}/>
            </div>
            {editForm.a2a&&<div className="space-y-2">
              <div className="text-xs text-gray-500 mb-2">연결 가능한 에이전트:</div>
              {agents.filter(a=>a.id!==selected.id&&a.a2a).map(a=>(
                <div key={a.id} className="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50 border">
                  <div className="flex items-center space-x-2"><Bot size={14} className="text-purple-500"/><span className="text-sm">{a.name}</span></div>
                  <StatusBadge status={a.status}/>
                </div>
              ))}
            </div>}
          </div>
          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <h3 className="font-bold text-sm mb-2 flex items-center"><Monitor size={16} className="mr-1.5 text-blue-600"/>Actionable AI</h3>
            <p className="text-xs text-gray-500 mb-4">실제 컴퓨터/브라우저 환경에서 업무를 직접 수행하는 실행형 AI 에이전트.</p>
            <div className="flex items-center justify-between p-4 rounded-xl bg-blue-50/50 border border-blue-200">
              <div><span className="font-bold text-sm">Actionable AI 모드</span><p className="text-xs text-gray-500 mt-0.5">ERP, 그룹웨어 등 업무 자동 수행</p></div>
              <ToggleSwitch on={editForm.actionable} onClick={()=>toggleField('actionable')}/>
            </div>
          </div>
        </div>
      </div>}

      {tab==='test'&&<div className="bg-white rounded-xl border shadow-sm flex flex-col" style={{height:'calc(100vh - 280px)'}}>
        <div className="px-5 py-3 border-b bg-gray-50/80 flex items-center justify-between rounded-t-xl">
          <div className="flex items-center space-x-2 text-sm"><Bot size={16} className="text-blue-600"/><span className="font-medium">{editForm.name||selected.name}</span></div>
          <div className="flex items-center space-x-2 text-xs">
            <span className={`px-2 py-0.5 rounded ${editForm.responseMode==='knowledge'?'bg-green-50 text-green-700':'bg-blue-50 text-blue-700'}`}>{editForm.responseMode==='knowledge'?'지식 참조':'직접 응답'}</span>
            {editForm.hitl&&<span className="bg-orange-50 text-orange-600 px-2 py-0.5 rounded">HITL</span>}
            <span className="text-gray-400">{editForm.model} T={editForm.temperature}</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {chatMsgs.map((m,i)=><div key={i} className={`flex ${m.role==='user'?'justify-end':'justify-start'}`}><div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap ${m.role==='user'?'bg-blue-600 text-white rounded-br-md':'bg-gray-100 text-gray-800 rounded-bl-md'}`}>{m.text}</div></div>)}
          <div ref={chatEndRef}/>
        </div>
        <div className="p-4 border-t bg-white rounded-b-xl">
          <div className="flex space-x-2"><input value={chatInput} onChange={e=>setChatInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&sendChat()} placeholder="테스트 메시지를 입력하세요..." className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"/><button onClick={sendChat} className="px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700"><Send size={16}/></button></div>
          <div className="flex items-center space-x-3 mt-2 text-[10px] text-gray-400"><AlertTriangle size={10}/><span>테스트 환경에서의 응답입니다. 실제 운영 환경과 다를 수 있습니다.</span></div>
        </div>
      </div>}

      {tab==='history'&&<div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <table className="w-full text-sm"><thead className="bg-gray-50/80"><tr>
          <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500">버전</th><th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500">변경 내용</th><th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500">작성자</th><th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500">날짜</th><th className="px-5 py-3.5 text-center text-xs font-medium text-gray-500">롤백</th>
        </tr></thead><tbody className="divide-y divide-gray-100">{versionHistory.map((v,i)=>(
          <tr key={i} className="hover:bg-gray-50"><td className="px-5 py-3.5"><span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-md text-xs font-bold">{v.ver}</span></td><td className="px-5 py-3.5 text-gray-700">{v.change}</td><td className="px-5 py-3.5 text-gray-500">{v.author}</td><td className="px-5 py-3.5 text-gray-400">{v.date}</td><td className="px-5 py-3.5 text-center">{i>0&&<button onClick={()=>setShowRollbackConfirm(i)} className="px-2.5 py-1 text-xs border rounded hover:bg-gray-50 text-gray-500"><RotateCcw size={10} className="inline mr-1"/>롤백</button>}</td></tr>
        ))}</tbody></table>
      </div>}
    </PageShell>
  );

  return (
    <PageShell breadcrumb={['에이전트','태스크플로우','빌더']} title="에이전트 빌더 (노코드)" action={<button onClick={()=>setShowCreateModal(true)} className="bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center shadow-sm hover:bg-blue-700"><Plus size={16} className="mr-1.5"/>새 에이전트 생성</button>}>
      <div className="flex items-center space-x-3 mb-5">
        <div className="relative flex-1 max-w-sm"><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="에이전트 검색..." className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"/><Search size={16} className="absolute left-3 top-3 text-gray-400"/></div>
        <select value={filterModel} onChange={e=>setFilterModel(e.target.value)} className="px-3 py-2.5 border rounded-lg text-sm bg-white"><option value="all">전체 모델</option>{models.map(m=><option key={m} value={m}>{m}</option>)}</select>
        <select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)} className="px-3 py-2.5 border rounded-lg text-sm bg-white"><option value="all">전체 상태</option><option value="Running">Running</option><option value="Stopped">Stopped</option></select>
      </div>
      <div className="grid grid-cols-3 gap-5">{filtered.map(a=>(
        <div key={a.id} className="bg-white rounded-xl border border-gray-200/80 shadow-sm hover:shadow-md hover:border-blue-300 cursor-pointer transition-all p-5 group">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-2.5" onClick={()=>selectAgent(a)}>
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform ${a.actionable?'bg-gradient-to-br from-purple-100 to-blue-100':'bg-blue-50'}`}><Bot size={18} className={a.actionable?'text-purple-600':'text-blue-600'}/></div>
              <div><div className="font-bold text-sm">{a.name}</div><span className="text-xs text-gray-400">{a.id}</span></div>
            </div>
            <div className="flex items-center space-x-2">
              <StatusBadge status={a.status}/>
              <button onClick={e=>{e.stopPropagation();toggleAgentStatus(a.id);}} className="p-1 hover:bg-gray-100 rounded" title={a.status==='Running'?'중지':'시작'}><Power size={13} className={a.status==='Running'?'text-green-500':'text-gray-400'}/></button>
            </div>
          </div>
          <p className="text-xs text-gray-500 mb-3 line-clamp-2 leading-relaxed" onClick={()=>selectAgent(a)}>{a.desc}</p>
          <div className="flex flex-wrap gap-1.5 mb-3">
            <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md text-xs">{a.model}</span>
            <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md text-xs font-medium">{a.version}</span>
            {a.ragEnabled&&<span className="bg-green-50 text-green-600 px-2 py-0.5 rounded-md text-xs">RAG</span>}
            {a.hitl&&<span className="bg-orange-50 text-orange-600 px-2 py-0.5 rounded-md text-xs">HITL</span>}
            {a.a2a&&<span className="bg-purple-50 text-purple-600 px-2 py-0.5 rounded-md text-xs">A2A</span>}
            {a.actionable&&<span className="bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 px-2 py-0.5 rounded-md text-xs">Actionable</span>}
          </div>
          {a.mcpTools.length>0&&<div className="flex items-center space-x-1 mb-3 text-[10px] text-purple-500"><Unplug size={10}/><span>MCP: {a.mcpTools.join(', ')}</span></div>}
          <div className="border-t pt-3 flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center space-x-3">
              <span className="flex items-center"><Activity size={12} className="mr-1"/>{a.requests24h}/day</span>
              <span className="flex items-center"><Clock size={12} className="mr-1"/>{a.avgLatency}</span>
            </div>
            <span className={`font-bold ${a.confidence>=0.9?'text-green-600':a.confidence>=0.7?'text-yellow-600':'text-red-500'}`}>{(a.confidence*100).toFixed(0)}%</span>
          </div>
          <div className="mt-3 pt-3 border-t flex items-center justify-between text-xs">
            <span className="text-gray-400">{a.creator} · {a.dept}</span>
            <span className={`px-1.5 py-0.5 rounded text-[10px] ${a.responseMode==='knowledge'?'bg-green-50 text-green-600':'bg-blue-50 text-blue-600'}`}>{a.responseMode==='knowledge'?'지식 참조':'직접 응답'}</span>
          </div>
        </div>
      ))}</div>
      {filtered.length===0&&<div className="text-center py-16 text-gray-400"><Bot size={40} className="mx-auto mb-3 text-gray-300"/><p className="text-sm">검색 조건에 맞는 에이전트가 없습니다.</p></div>}
      <Modal isOpen={showCreateModal} onClose={()=>setShowCreateModal(false)} title="새 에이전트 생성" size="md">
        <div className="space-y-4">
          <div><label className="text-sm font-bold">에이전트 이름 *</label><input value={newAgent.name} onChange={e=>setNewAgent(p=>({...p,name:e.target.value}))} placeholder="예: 안전규정 검색 에이전트" className="w-full mt-1 px-3.5 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"/></div>
          <div><label className="text-sm font-bold">설명</label><input value={newAgent.desc} onChange={e=>setNewAgent(p=>({...p,desc:e.target.value}))} placeholder="에이전트 역할을 간략히 설명하세요" className="w-full mt-1 px-3.5 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"/></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-sm font-bold">모델</label><select value={newAgent.model} onChange={e=>setNewAgent(p=>({...p,model:e.target.value}))} className="w-full mt-1 px-3.5 py-2.5 border rounded-lg text-sm bg-white">{MOCK_MODELS.map(m=><option key={m.id} value={m.name}>{m.name}</option>)}</select></div>
            <div><label className="text-sm font-bold">응답 모드</label><select value={newAgent.responseMode} onChange={e=>setNewAgent(p=>({...p,responseMode:e.target.value}))} className="w-full mt-1 px-3.5 py-2.5 border rounded-lg text-sm bg-white"><option value="knowledge">지식 참조</option><option value="direct">직접 응답</option></select></div>
          </div>
          <div><label className="text-sm font-bold">시스템 프롬프트</label><textarea value={newAgent.systemPrompt} onChange={e=>setNewAgent(p=>({...p,systemPrompt:e.target.value}))} placeholder="에이전트의 역할과 행동 지침을 정의하세요..." className="w-full mt-1 h-24 px-3.5 py-2.5 border rounded-lg text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20"/></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-sm font-bold">Temperature</label><input type="number" value={newAgent.temperature} onChange={e=>setNewAgent(p=>({...p,temperature:parseFloat(e.target.value)||0}))} step="0.1" min="0" max="1" className="w-full mt-1 px-3.5 py-2.5 border rounded-lg text-sm"/></div>
            <div><label className="text-sm font-bold">Max Tokens</label><input type="number" value={newAgent.maxTokens} onChange={e=>setNewAgent(p=>({...p,maxTokens:parseInt(e.target.value)||2048}))} className="w-full mt-1 px-3.5 py-2.5 border rounded-lg text-sm"/></div>
          </div>
        </div>
        <div className="flex justify-end space-x-2 mt-6 pt-4 border-t">
          <button onClick={()=>setShowCreateModal(false)} className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50">취소</button>
          <button onClick={handleCreate} className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">생성</button>
        </div>
      </Modal>
    </PageShell>
  );
};

const TaskflowDeployPage = () => {
  const toast=useToast();
  const [deploys,setDeploys]=useState(MOCK_AGENT_DEPLOYS);
  const [selDep,setSelDep]=useState(null);
  const [showCreateModal,setShowCreateModal]=useState(false);
  const [showScaleModal,setShowScaleModal]=useState(false);
  const [scaleReplicas,setScaleReplicas]=useState(1);
  const [showStopConfirm,setShowStopConfirm]=useState(false);
  const [showRedeployConfirm,setShowRedeployConfirm]=useState(false);
  const [newDeploy,setNewDeploy]=useState({agentName:'안전규정 검색 에이전트',env:'Production',replicas:2,cpu:'2 Core',memory:'8 GB',gpu:'-'});
  const running=deploys.filter(d=>d.status==='Running').length;
  const totalReq=deploys.reduce((s,d)=>s+d.requests24h,0);
  const avgErr=running?(deploys.filter(d=>d.status==='Running').reduce((s,d)=>s+d.errorRate,0)/running).toFixed(1):'0';
  const handleStopStart=()=>{const newSt=selDep.status==='Running'?'Stopped':'Running';setDeploys(p=>p.map(d=>d.id===selDep.id?{...d,status:newSt,replicas:newSt==='Stopped'?0:d.replicas||2}:d));setSelDep(p=>({...p,status:newSt,replicas:newSt==='Stopped'?0:p.replicas||2}));toast(`배포가 ${newSt==='Running'?'시작':'중지'}되었습니다.`,newSt==='Running'?'success':'warning');};
  const handleRedeploy=()=>{const now=new Date();const dateStr=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;setDeploys(p=>p.map(d=>d.id===selDep.id?{...d,status:'Restarting',deployDate:dateStr}:d));setSelDep(p=>({...p,status:'Restarting',deployDate:dateStr}));toast('재배포 시작됨...','info');setTimeout(()=>{setDeploys(p=>p.map(d=>d.id===selDep.id?{...d,status:'Running'}:d));setSelDep(p=>p?{...p,status:'Running'}:p);toast('재배포가 완료되었습니다.');},2000);};
  const handleScale=()=>{setDeploys(p=>p.map(d=>d.id===selDep.id?{...d,replicas:scaleReplicas}:d));setSelDep(p=>({...p,replicas:scaleReplicas}));setShowScaleModal(false);toast(`Replicas가 ${scaleReplicas}개로 조정되었습니다.`);};
  const copyEndpoint=()=>{navigator.clipboard?.writeText(selDep.endpoint).catch(()=>{});toast('엔드포인트가 클립보드에 복사되었습니다.');};
  const handleCreateDeploy=()=>{const id='DEP-'+(deploys.length+1).toString().padStart(3,'0');const now=new Date();const dateStr=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;const d={id,agentId:'AGT-NEW',agentName:newDeploy.agentName,model:'GPT-OSS-120B',version:'v1.0',env:newDeploy.env,endpoint:`/api/agent/${id.toLowerCase()}`,deployDate:dateStr,deployer:'김영빈',status:'Running',replicas:newDeploy.replicas,cpu:newDeploy.cpu,memory:newDeploy.memory,gpu:newDeploy.gpu,uptime:'0h',requests24h:0,errorRate:0};setDeploys(p=>[...p,d]);setShowCreateModal(false);toast(`'${d.agentName}' 배포가 생성되었습니다.`);};
  return (
    <PageShell breadcrumb={['에이전트','태스크플로우','배포']} title="배포 관리" action={<button onClick={()=>setShowCreateModal(true)} className="bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center shadow-sm hover:bg-blue-700"><Plus size={16} className="mr-1.5"/>새 배포</button>}>
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[{label:'총 배포 수',value:deploys.length,unit:'개',color:'border-blue-500 bg-blue-50',tc:'text-blue-700'},{label:'실행 중',value:running,unit:'개',color:'border-green-500 bg-green-50',tc:'text-green-700'},{label:'24h 총 요청',value:totalReq.toLocaleString(),unit:'건',color:'border-purple-500 bg-purple-50',tc:'text-purple-700'},{label:'평균 에러율',value:avgErr,unit:'%',color:'border-orange-500 bg-orange-50',tc:'text-orange-700'}].map((c,i)=>(
          <div key={i} className={`p-5 rounded-xl border-l-4 bg-white shadow-sm ${c.color}`}>
            <div className="text-xs text-gray-500 mb-1">{c.label}</div>
            <div className={`text-2xl font-bold ${c.tc}`}>{c.value}<span className="text-sm font-normal text-gray-400 ml-1">{c.unit}</span></div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <table className="w-full text-sm"><thead className="bg-gray-50/80"><tr>
          <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500">배포 ID</th>
          <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500">에이전트</th>
          <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500">모델</th>
          <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500">버전</th>
          <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500">환경</th>
          <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500">Replicas</th>
          <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500">상태</th>
          <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500">배포일</th>
          <th className="px-5 py-3.5 text-center text-xs font-medium text-gray-500">상세</th>
        </tr></thead><tbody className="divide-y divide-gray-100">{deploys.map(d=>(
          <tr key={d.id} className="hover:bg-gray-50/50">
            <td className="px-5 py-3.5 font-mono text-xs text-gray-500">{d.id}</td>
            <td className="px-5 py-3.5 font-medium">{d.agentName}</td>
            <td className="px-5 py-3.5 text-gray-600">{d.model}</td>
            <td className="px-5 py-3.5"><span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md text-xs font-medium">{d.version}</span></td>
            <td className="px-5 py-3.5"><span className={`px-2 py-0.5 rounded-md text-xs font-medium ${d.env==='Production'?'bg-green-50 text-green-700':'bg-yellow-50 text-yellow-700'}`}>{d.env}</span></td>
            <td className="px-5 py-3.5 text-gray-600">{d.replicas}</td>
            <td className="px-5 py-3.5"><StatusBadge status={d.status}/></td>
            <td className="px-5 py-3.5 text-gray-400 text-xs">{d.deployDate}</td>
            <td className="px-5 py-3.5 text-center"><button onClick={()=>setSelDep(d)} className="p-1.5 hover:bg-blue-50 rounded-lg text-gray-400 hover:text-blue-600"><Eye size={15}/></button></td>
          </tr>
        ))}</tbody></table>
      </div>
      <Modal isOpen={!!selDep} onClose={()=>setSelDep(null)} title={`${selDep?.agentName} 배포 상세`} size="lg">
        {selDep&&<div className="space-y-5">
          <div className="flex items-center space-x-3 mb-2">
            <StatusBadge status={selDep.status}/>
            <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${selDep.env==='Production'?'bg-green-50 text-green-700':'bg-yellow-50 text-yellow-700'}`}>{selDep.env}</span>
            <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md text-xs font-medium">{selDep.version}</span>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[{l:'CPU',v:selDep.cpu},{l:'메모리',v:selDep.memory},{l:'GPU',v:selDep.gpu},{l:'Replicas',v:selDep.replicas}].map((r,i)=>(
              <div key={i} className="bg-gray-50 rounded-lg p-3"><div className="text-xs text-gray-400">{r.l}</div><div className="font-bold mt-0.5">{r.v}</div></div>
            ))}
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-xs text-gray-400 mb-1">엔드포인트</div>
            <div className="flex items-center space-x-2"><code className="text-sm font-mono bg-white px-3 py-1.5 rounded border flex-1">{selDep.endpoint}</code><button onClick={copyEndpoint} className="p-2 hover:bg-gray-200 rounded-lg" title="복사"><Copy size={14}/></button></div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-blue-50 rounded-lg p-3 text-center"><div className="text-xl font-bold text-blue-700">{selDep.requests24h}</div><div className="text-xs text-blue-500">24h 요청</div></div>
            <div className="bg-green-50 rounded-lg p-3 text-center"><div className="text-xl font-bold text-green-700">{selDep.uptime}</div><div className="text-xs text-green-500">업타임</div></div>
            <div className="bg-orange-50 rounded-lg p-3 text-center"><div className="text-xl font-bold text-orange-700">{selDep.errorRate}%</div><div className="text-xs text-orange-500">에러율</div></div>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-green-400 h-32 overflow-y-auto">
            <div className="text-gray-500 border-b border-gray-700 pb-1 mb-2">최근 로그</div>
            <div>[2026-02-13 09:30:12] INFO Agent {selDep.agentName} processed request #4821</div>
            <div>[2026-02-13 09:29:45] INFO Response generated in {selDep.status==='Running'?'1.2':'0.0'}s</div>
            <div>[2026-02-13 09:28:33] INFO RAG retrieval: 5 chunks, similarity 0.89</div>
            <div className="text-yellow-400">[2026-02-13 09:25:11] WARN Token limit approaching (1856/2048)</div>
          </div>
          <div className="flex space-x-2 justify-end pt-2">
            <button onClick={()=>{setScaleReplicas(selDep.replicas||1);setShowScaleModal(true);}} className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50">스케일 조정</button>
            <button onClick={()=>setShowStopConfirm(true)} className="px-4 py-2 border border-red-200 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50">{selDep.status==='Running'?'중지':'시작'}</button>
            <button onClick={()=>setShowRedeployConfirm(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">재배포</button>
          </div>
        </div>}
      </Modal>
      <ConfirmDialog isOpen={showStopConfirm} onClose={()=>setShowStopConfirm(false)} onConfirm={handleStopStart} title={selDep?.status==='Running'?'배포 중지':'배포 시작'} message={`'${selDep?.agentName}'을(를) ${selDep?.status==='Running'?'중지':'시작'}하시겠습니까?`} confirmText={selDep?.status==='Running'?'중지':'시작'} danger={selDep?.status==='Running'}/>
      <ConfirmDialog isOpen={showRedeployConfirm} onClose={()=>setShowRedeployConfirm(false)} onConfirm={handleRedeploy} title="재배포 확인" message={`'${selDep?.agentName}'을(를) 재배포하시겠습니까? 일시적으로 서비스가 중단될 수 있습니다.`} confirmText="재배포"/>
      <Modal isOpen={showScaleModal} onClose={()=>setShowScaleModal(false)} title="스케일 조정" size="sm">
        <div className="space-y-4">
          <div><label className="text-sm font-bold">Replicas 수</label><div className="flex items-center space-x-4 mt-2">
            <button onClick={()=>setScaleReplicas(p=>Math.max(0,p-1))} className="w-10 h-10 border rounded-lg flex items-center justify-center text-lg font-bold hover:bg-gray-50">-</button>
            <span className="text-3xl font-bold text-blue-600 w-12 text-center">{scaleReplicas}</span>
            <button onClick={()=>setScaleReplicas(p=>Math.min(10,p+1))} className="w-10 h-10 border rounded-lg flex items-center justify-center text-lg font-bold hover:bg-gray-50">+</button>
          </div></div>
          <div className="bg-blue-50 rounded-lg p-3 text-xs text-blue-700">현재 Replicas: {selDep?.replicas || 0}개 → 변경: {scaleReplicas}개</div>
        </div>
        <div className="flex justify-end space-x-2 mt-6 pt-4 border-t">
          <button onClick={()=>setShowScaleModal(false)} className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50">취소</button>
          <button onClick={handleScale} className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">적용</button>
        </div>
      </Modal>
      <Modal isOpen={showCreateModal} onClose={()=>setShowCreateModal(false)} title="새 배포 생성" size="md">
        <div className="space-y-4">
          <div><label className="text-sm font-bold">에이전트</label><select value={newDeploy.agentName} onChange={e=>setNewDeploy(p=>({...p,agentName:e.target.value}))} className="w-full mt-1 px-3.5 py-2.5 border rounded-lg text-sm bg-white">{MOCK_AGENTS.map(a=><option key={a.id} value={a.name}>{a.name}</option>)}</select></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-sm font-bold">환경</label><select value={newDeploy.env} onChange={e=>setNewDeploy(p=>({...p,env:e.target.value}))} className="w-full mt-1 px-3.5 py-2.5 border rounded-lg text-sm bg-white"><option>Production</option><option>Staging</option></select></div>
            <div><label className="text-sm font-bold">Replicas</label><input type="number" value={newDeploy.replicas} onChange={e=>setNewDeploy(p=>({...p,replicas:parseInt(e.target.value)||1}))} min="1" max="10" className="w-full mt-1 px-3.5 py-2.5 border rounded-lg text-sm"/></div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div><label className="text-sm font-bold">CPU</label><select value={newDeploy.cpu} onChange={e=>setNewDeploy(p=>({...p,cpu:e.target.value}))} className="w-full mt-1 px-3.5 py-2.5 border rounded-lg text-sm bg-white"><option>1 Core</option><option>2 Core</option><option>4 Core</option></select></div>
            <div><label className="text-sm font-bold">메모리</label><select value={newDeploy.memory} onChange={e=>setNewDeploy(p=>({...p,memory:e.target.value}))} className="w-full mt-1 px-3.5 py-2.5 border rounded-lg text-sm bg-white"><option>4 GB</option><option>8 GB</option><option>16 GB</option></select></div>
            <div><label className="text-sm font-bold">GPU</label><select value={newDeploy.gpu} onChange={e=>setNewDeploy(p=>({...p,gpu:e.target.value}))} className="w-full mt-1 px-3.5 py-2.5 border rounded-lg text-sm bg-white"><option>-</option><option>H200 x1</option><option>H200 x2</option><option>L40S x1</option></select></div>
          </div>
        </div>
        <div className="flex justify-end space-x-2 mt-6 pt-4 border-t">
          <button onClick={()=>setShowCreateModal(false)} className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50">취소</button>
          <button onClick={handleCreateDeploy} className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">배포</button>
        </div>
      </Modal>
    </PageShell>
  );
};

const WorkflowStepNode = ({step,isLast}) => {
  const cfg={trigger:{bg:'bg-orange-50',border:'border-orange-300',icon:Zap,iconColor:'text-orange-500',label:'트리거'},agent:{bg:'bg-blue-50',border:'border-blue-300',icon:Bot,iconColor:'text-blue-600',label:'에이전트'},condition:{bg:'bg-yellow-50',border:'border-yellow-300',icon:Filter,iconColor:'text-yellow-600',label:'조건 분기'},action:{bg:'bg-green-50',border:'border-green-300',icon:Play,iconColor:'text-green-600',label:'액션'},hitl:{bg:'bg-orange-50',border:'border-orange-400',icon:Users,iconColor:'text-orange-600',label:'HITL 검토'},mcp:{bg:'bg-purple-50',border:'border-purple-300',icon:Unplug,iconColor:'text-purple-600',label:'MCP 도구'}};
  const c=cfg[step.type]||cfg.action;
  return (
    <div className="flex items-center shrink-0">
      <div className={`w-36 ${c.bg} border-2 ${c.border} rounded-xl p-3 text-center shadow-sm hover:shadow-md transition-shadow`}>
        <c.icon size={20} className={`mx-auto mb-1.5 ${c.iconColor}`}/>
        <div className="text-xs font-bold text-gray-800 leading-tight">{step.name}</div>
        <div className="text-[10px] text-gray-400 mt-0.5">{c.label}</div>
      </div>
      {!isLast&&<div className="w-8 flex items-center justify-center shrink-0"><ArrowRight size={16} className="text-gray-300"/></div>}
    </div>
  );
};

const WorkflowPage = () => {
  const toast=useToast();
  const [workflows,setWorkflows]=useState(MOCK_WORKFLOWS);
  const [expanded,setExpanded]=useState({});
  const [showCreateModal,setShowCreateModal]=useState(false);
  const [runningWf,setRunningWf]=useState({});
  const [showRunConfirm,setShowRunConfirm]=useState(null);
  const [showStopConfirm,setShowStopConfirm]=useState(null);
  const [newWf,setNewWf]=useState({name:'',desc:'',protocol:'MCP',hitl:false});
  const toggle=(id)=>setExpanded(p=>({...p,[id]:!p[id]}));
  const [wfRuns,setWfRuns]=useState({});
  const mockRuns=[
    {id:'RUN-0081',start:'2026-02-13 09:30',duration:'2m 14s',status:'완료'},{id:'RUN-0080',start:'2026-02-13 08:15',duration:'1m 58s',status:'완료'},
    {id:'RUN-0079',start:'2026-02-12 17:42',duration:'3m 05s',status:'오류 발생'},{id:'RUN-0078',start:'2026-02-12 14:20',duration:'2m 31s',status:'완료'},
  ];
  const handleRun=(wfId)=>{setRunningWf(p=>({...p,[wfId]:true}));toast('워크플로우 실행이 시작되었습니다.','info');const now=new Date();const dateStr=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;setTimeout(()=>{setRunningWf(p=>({...p,[wfId]:false}));const newRun={id:`RUN-${String(Math.floor(Math.random()*9000)+1000)}`,start:dateStr,duration:`${Math.floor(Math.random()*3)+1}m ${String(Math.floor(Math.random()*60)).padStart(2,'0')}s`,status:'완료'};setWfRuns(p=>({...p,[wfId]:[newRun,...(p[wfId]||[])]}));setWorkflows(p=>p.map(w=>w.id===wfId?{...w,lastRun:dateStr,runs24h:w.runs24h+1}:w));toast('워크플로우 실행이 완료되었습니다.');},3000);};
  const handleStop=(wfId)=>{setWorkflows(p=>p.map(w=>w.id===wfId?{...w,status:w.status==='Running'?'Stopped':'Running'}:w));toast(`워크플로우가 ${workflows.find(w=>w.id===wfId)?.status==='Running'?'중지':'시작'}되었습니다.`,workflows.find(w=>w.id===wfId)?.status==='Running'?'warning':'success');};
  const handleCreate=()=>{if(!newWf.name.trim()){toast('워크플로우 이름을 입력하세요.','error');return;}const id='WF-'+(workflows.length+1).toString().padStart(3,'0');const now=new Date().toISOString().slice(0,10);const wf={id,name:newWf.name,desc:newWf.desc,status:'Stopped',creator:'김영빈',created:now,lastRun:'-',runs24h:0,successRate:0,protocol:newWf.protocol,hitl:newWf.hitl,steps:[{id:'s1',name:'트리거 이벤트',type:'trigger',agentId:null},{id:'s2',name:'에이전트 처리',type:'agent',agentId:'AGT-001'}]};setWorkflows(p=>[...p,wf]);setShowCreateModal(false);setNewWf({name:'',desc:'',protocol:'MCP',hitl:false});toast(`'${wf.name}' 워크플로우가 생성되었습니다.`);};
  return (
    <PageShell breadcrumb={['에이전트','워크플로우']} title="멀티 에이전트 워크플로우" action={<button onClick={()=>setShowCreateModal(true)} className="bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center shadow-sm hover:bg-blue-700"><Plus size={16} className="mr-1.5"/>새 워크플로우 생성</button>}>
      <div className="flex items-center space-x-4 mb-5 text-xs">
        <div className="flex items-center space-x-1.5"><div className="w-3 h-3 rounded bg-orange-200 border border-orange-400"/><span className="text-gray-500">트리거</span></div>
        <div className="flex items-center space-x-1.5"><div className="w-3 h-3 rounded bg-blue-200 border border-blue-400"/><span className="text-gray-500">에이전트</span></div>
        <div className="flex items-center space-x-1.5"><div className="w-3 h-3 rounded bg-yellow-200 border border-yellow-400"/><span className="text-gray-500">조건 분기</span></div>
        <div className="flex items-center space-x-1.5"><div className="w-3 h-3 rounded bg-purple-200 border border-purple-400"/><span className="text-gray-500">MCP 도구</span></div>
        <div className="flex items-center space-x-1.5"><div className="w-3 h-3 rounded bg-orange-200 border border-orange-500"/><span className="text-gray-500">HITL 검토</span></div>
        <div className="flex items-center space-x-1.5"><div className="w-3 h-3 rounded bg-green-200 border border-green-400"/><span className="text-gray-500">액션</span></div>
      </div>
      <div className="space-y-5">{workflows.map(wf=>(
        <div key={wf.id} className={`bg-white rounded-xl border shadow-sm overflow-hidden ${runningWf[wf.id]?'ring-2 ring-blue-400 ring-offset-2':''}`}>
          <div className="p-5">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${wf.status==='Running'?'bg-blue-50':'bg-gray-100'} ${runningWf[wf.id]?'animate-pulse':''}`}><Layers size={20} className={wf.status==='Running'?'text-blue-600':'text-gray-400'}/></div>
                <div>
                  <div className="flex items-center space-x-2"><h3 className="font-bold">{wf.name}</h3>
                    {wf.protocol&&<span className="bg-purple-50 text-purple-600 px-1.5 py-0.5 rounded text-[10px] font-bold">{wf.protocol}</span>}
                    {wf.hitl&&<span className="bg-orange-50 text-orange-600 px-1.5 py-0.5 rounded text-[10px] font-bold">HITL</span>}
                    {runningWf[wf.id]&&<span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded text-[10px] font-bold animate-pulse">실행 중...</span>}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{wf.desc}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button onClick={()=>{if(runningWf[wf.id])return;setShowRunConfirm(wf.id);}} disabled={runningWf[wf.id]||wf.status==='Stopped'} className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-1 ${runningWf[wf.id]?'bg-gray-100 text-gray-400 cursor-not-allowed':wf.status==='Stopped'?'bg-gray-100 text-gray-400 cursor-not-allowed':'bg-blue-600 text-white hover:bg-blue-700'}`}><Play size={12}/><span>실행</span></button>
                <button onClick={()=>setShowStopConfirm(wf.id)} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${wf.status==='Running'?'border border-red-200 text-red-600 hover:bg-red-50':'border border-green-200 text-green-600 hover:bg-green-50'}`}>{wf.status==='Running'?'중지':'시작'}</button>
                <StatusBadge status={wf.status}/>
                <button onClick={()=>toggle(wf.id)} className="p-1.5 hover:bg-gray-100 rounded-lg"><ChevronDown size={16} className={`text-gray-400 transition-transform ${expanded[wf.id]?'rotate-180':''}`}/></button>
              </div>
            </div>
            <div className="flex items-center space-x-5 text-xs text-gray-400 mb-5 ml-[52px]">
              <span>생성자: {wf.creator}</span><span>최종 실행: {wf.lastRun}</span><span>24h 실행: {wf.runs24h}회</span><span>성공률: {wf.successRate}%</span><span>노드: {wf.steps.length}개</span>
            </div>
            <div className="bg-gray-50/80 rounded-xl p-5 overflow-x-auto">
              <div className="flex items-center min-w-max">
                {wf.steps.map((s,i)=><WorkflowStepNode key={s.id} step={s} isLast={i===wf.steps.length-1}/>)}
              </div>
            </div>
          </div>
          {expanded[wf.id]&&<div className="border-t">
            <div className="px-5 py-3 bg-gray-50/50 text-xs font-bold text-gray-500">실행 이력</div>
            <table className="w-full text-sm"><thead className="bg-gray-50/50"><tr>
              <th className="px-5 py-2.5 text-left text-xs font-medium text-gray-400">Run ID</th>
              <th className="px-5 py-2.5 text-left text-xs font-medium text-gray-400">시작 시간</th>
              <th className="px-5 py-2.5 text-left text-xs font-medium text-gray-400">소요 시간</th>
              <th className="px-5 py-2.5 text-left text-xs font-medium text-gray-400">상태</th>
            </tr></thead><tbody className="divide-y divide-gray-100">{[...(wfRuns[wf.id]||[]),...mockRuns].map(r=>(
              <tr key={r.id} className="hover:bg-gray-50/50"><td className="px-5 py-2.5 font-mono text-xs text-gray-500">{r.id}</td><td className="px-5 py-2.5 text-gray-600">{r.start}</td><td className="px-5 py-2.5 text-gray-500">{r.duration}</td><td className="px-5 py-2.5"><StatusBadge status={r.status}/></td></tr>
            ))}</tbody></table>
          </div>}
        </div>
      ))}</div>
      <ConfirmDialog isOpen={showRunConfirm!==null} onClose={()=>setShowRunConfirm(null)} onConfirm={()=>{handleRun(showRunConfirm);}} title="워크플로우 실행" message={`'${workflows.find(w=>w.id===showRunConfirm)?.name}' 워크플로우를 실행하시겠습니까?`} confirmText="실행"/>
      <ConfirmDialog isOpen={showStopConfirm!==null} onClose={()=>setShowStopConfirm(null)} onConfirm={()=>{handleStop(showStopConfirm);}} title={`워크플로우 ${workflows.find(w=>w.id===showStopConfirm)?.status==='Running'?'중지':'시작'}`} message={`'${workflows.find(w=>w.id===showStopConfirm)?.name}' 워크플로우를 ${workflows.find(w=>w.id===showStopConfirm)?.status==='Running'?'중지':'시작'}하시겠습니까?`} confirmText={workflows.find(w=>w.id===showStopConfirm)?.status==='Running'?'중지':'시작'} danger={workflows.find(w=>w.id===showStopConfirm)?.status==='Running'}/>
      <Modal isOpen={showCreateModal} onClose={()=>setShowCreateModal(false)} title="새 워크플로우 생성" size="md">
        <div className="space-y-4">
          <div><label className="text-sm font-bold">워크플로우 이름 *</label><input value={newWf.name} onChange={e=>setNewWf(p=>({...p,name:e.target.value}))} placeholder="예: 설비 이상 자동 대응" className="w-full mt-1 px-3.5 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"/></div>
          <div><label className="text-sm font-bold">설명</label><textarea value={newWf.desc} onChange={e=>setNewWf(p=>({...p,desc:e.target.value}))} placeholder="워크플로우의 목적과 처리 흐름을 설명하세요" className="w-full mt-1 h-20 px-3.5 py-2.5 border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20"/></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-sm font-bold">프로토콜</label><select value={newWf.protocol} onChange={e=>setNewWf(p=>({...p,protocol:e.target.value}))} className="w-full mt-1 px-3.5 py-2.5 border rounded-lg text-sm bg-white"><option>MCP</option><option>A2A</option><option>MCP+A2A</option></select></div>
            <div><label className="text-sm font-bold">HITL</label><div className="flex items-center mt-3 space-x-2"><ToggleSwitch on={newWf.hitl} onClick={()=>setNewWf(p=>({...p,hitl:!p.hitl}))}/><span className="text-sm text-gray-600">{newWf.hitl?'활성화':'비활성화'}</span></div></div>
          </div>
        </div>
        <div className="flex justify-end space-x-2 mt-6 pt-4 border-t">
          <button onClick={()=>setShowCreateModal(false)} className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50">취소</button>
          <button onClick={handleCreate} className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">생성</button>
        </div>
      </Modal>
    </PageShell>
  );
};

const ChatAppPage = () => {
  const toast=useToast();
  const [apps,setApps]=useState(MOCK_CHAT_APPS);
  const [showModal,setShowModal]=useState(false);const [step,setStep]=useState(1);
  const [chatForm,setChatForm]=useState({title:'',desc:'',group:'AI Engineer',model:'GPT-OSS-120B',mode:'knowledge',approval:false});
  const handleCreate=()=>{const id=apps.length>0?Math.max(...apps.map(a=>a.id))+1:1;const a={id,name:chatForm.title,type:'전용 채팅',status:'Online',deploy:'배포',creator:'김영빈',dept:chatForm.group,addr:''};setApps(p=>[a,...p]);setShowModal(false);setStep(1);setChatForm({title:'',desc:'',group:'AI Engineer',model:'GPT-OSS-120B',mode:'knowledge',approval:false});toast(`'${chatForm.title}' 채팅 앱이 생성되었습니다.`);};
  const toggleDeploy=(id)=>{setApps(p=>p.map(a=>a.id===id?{...a,status:a.status==='Online'?'Offline':'Online',deploy:a.deploy==='배포'?'배포중지':'배포'}:a));toast('배포 상태가 변경되었습니다.','info');};
  const copyAddr=(id)=>{toast(`앱 ID ${id}의 주소가 클립보드에 복사되었습니다.`);};
  return (
    <PageShell breadcrumb={['애플리케이션','채팅']}>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold">채팅 애플리케이션 목록</h2>
        <div className="flex space-x-2">
          <button onClick={()=>{setShowModal(true);setStep(1);}} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center"><Plus size={16} className="mr-1"/>애플리케이션 생성</button>
        </div>
      </div>
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm"><thead className="bg-gray-50 text-xs text-gray-500"><tr>
          <th className="px-4 py-3 text-left">ID</th><th className="px-4 py-3 text-left">제목</th><th className="px-4 py-3 text-left">유형</th><th className="px-4 py-3 text-center">상태</th><th className="px-4 py-3 text-center">배포</th><th className="px-4 py-3 text-left">제작자</th><th className="px-4 py-3 text-left">관리 그룹</th><th className="px-4 py-3 text-center">액션</th>
        </tr></thead><tbody className="divide-y">{apps.map(a=>(
          <tr key={a.id} className="hover:bg-gray-50"><td className="px-4 py-3 text-gray-500">{a.id}</td><td className="px-4 py-3 font-medium">{a.name||'-'}</td><td className="px-4 py-3">{a.type||'-'}</td>
            <td className="px-4 py-3 text-center">{a.status?<StatusBadge status={a.status}/>:'-'}</td>
            <td className="px-4 py-3 text-center">{a.deploy?<span className="cursor-pointer" onClick={()=>toggleDeploy(a.id)}><StatusBadge status={a.deploy}/></span>:'-'}</td>
            <td className="px-4 py-3">{a.creator||'-'}</td><td className="px-4 py-3">{a.dept}</td>
            <td className="px-4 py-3 text-center"><div className="flex items-center justify-center space-x-1">
              <button onClick={()=>copyAddr(a.id)} title="주소 복사"><Copy size={14} className="text-gray-400 cursor-pointer hover:text-blue-600"/></button>
              {a.deploy&&<button onClick={()=>toggleDeploy(a.id)} title={a.deploy==='배포'?'배포 중지':'배포'}><Power size={14} className={a.status==='Online'?'text-green-500 hover:text-red-500':'text-gray-400 hover:text-green-500'}/></button>}
            </div></td></tr>
        ))}</tbody></table>
      </div>
      <Modal isOpen={showModal} onClose={()=>setShowModal(false)} title="채팅 생성" size="md">
        <div className="flex justify-center space-x-4 mb-8">{[1,2,3,4].map(s=>(
          <div key={s} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step>s?'bg-blue-600 text-white':step===s?'bg-blue-600 text-white ring-4 ring-blue-100':'bg-gray-200 text-gray-500'}`}>{step>s?<Check size={14}/>:s}</div>
            <span className="ml-2 text-sm font-medium">{['기본정보','모델설정','권한설정','완료'][s-1]}</span>
            {s<4&&<div className={`w-12 h-0.5 mx-2 ${step>s?'bg-blue-600':'bg-gray-200'}`}/>}
          </div>
        ))}</div>
        {step===1&&<div className="space-y-4">
          <div><label className="text-sm font-bold">제목 *</label><input value={chatForm.title} onChange={e=>setChatForm(p=>({...p,title:e.target.value}))} placeholder="제목을 입력하세요" className="w-full mt-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"/></div>
          <div><label className="text-sm font-bold">상세 설명</label><input value={chatForm.desc} onChange={e=>setChatForm(p=>({...p,desc:e.target.value}))} placeholder="상세 설명을 입력하세요" className="w-full mt-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"/></div>
          <div><label className="text-sm font-bold">관리 그룹 *</label><select value={chatForm.group} onChange={e=>setChatForm(p=>({...p,group:e.target.value}))} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm bg-white"><option>AI Engineer</option><option>QA</option><option>기술안전팀</option><option>경영지원팀</option></select></div>
        </div>}
        {step===2&&<div className="space-y-4">
          <div><label className="text-sm font-bold">LLM 모델 선택 *</label><select value={chatForm.model} onChange={e=>setChatForm(p=>({...p,model:e.target.value}))} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm bg-white">{MOCK_MODELS.map(m=><option key={m.id} value={m.name}>{m.name}</option>)}</select></div>
          <div><label className="text-sm font-bold">응답 모드</label>
            <div className="mt-2 space-y-2">
              <div onClick={()=>setChatForm(p=>({...p,mode:'knowledge'}))} className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${chatForm.mode==='knowledge'?'bg-blue-50 border-blue-200':''}`}><input type="radio" name="mode" checked={chatForm.mode==='knowledge'} readOnly className="mr-2"/><div><div className="font-medium text-sm">지식 참조 모드</div><div className="text-xs text-gray-500">RAG 파이프라인을 통한 내부 문서 참조 응답</div></div></div>
              <div onClick={()=>setChatForm(p=>({...p,mode:'direct'}))} className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${chatForm.mode==='direct'?'bg-blue-50 border-blue-200':''}`}><input type="radio" name="mode" checked={chatForm.mode==='direct'} readOnly className="mr-2"/><div><div className="font-medium text-sm">직접 응답 모드</div><div className="text-xs text-gray-500">내부 LLM만 활용한 즉각적 응답</div></div></div>
            </div>
          </div>
        </div>}
        {step===3&&<div className="space-y-4">
          <div><label className="text-sm font-bold">승인 필요 여부</label><div className="mt-2 flex items-center space-x-2"><ToggleSwitch on={chatForm.approval} onClick={()=>setChatForm(p=>({...p,approval:!p.approval}))}/><span className="text-sm text-gray-600">{chatForm.approval?'승인 후 배포':'즉시 배포'}</span></div></div>
          <div><label className="text-sm font-bold">사용 가능한 관리 그룹</label><select className="w-full mt-1 px-3 py-2 border rounded-lg text-sm bg-white"><option>AI Engineer</option><option>QA</option><option>전체</option></select></div>
          <div><label className="text-sm font-bold">사용 가능한 역할</label><select className="w-full mt-1 px-3 py-2 border rounded-lg text-sm bg-white"><option>전체</option><option>시스템관리자</option><option>부서관리자</option><option>일반사용자</option></select></div>
        </div>}
        {step===4&&<div className="text-center py-8"><CheckCircle size={48} className="mx-auto text-green-500 mb-4"/><h3 className="text-lg font-bold">설정 완료!</h3><p className="text-gray-500 mt-2">'{chatForm.title}' 채팅 애플리케이션이 생성됩니다.</p><div className="mt-4 text-sm text-gray-500"><div>모델: {chatForm.model}</div><div>응답 모드: {chatForm.mode==='knowledge'?'지식 참조':'직접 응답'}</div><div>그룹: {chatForm.group}</div></div></div>}
        <div className="flex justify-between items-center mt-8 pt-4 border-t">
          <button onClick={()=>setShowModal(false)} className="px-4 py-2 border rounded-lg text-sm">닫기</button>
          <div className="flex space-x-2">
            {step>1&&<button onClick={()=>setStep(s=>s-1)} className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium">← 이전</button>}
            <button onClick={()=>{if(step===1&&!chatForm.title.trim()){toast('제목을 입력하세요.','error');return;}if(step<4)setStep(s=>s+1);else handleCreate();}} className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">{step===4?'생성':'다음 →'}</button>
          </div>
        </div>
      </Modal>
    </PageShell>
  );
};

const ReportGenPage = () => {
  const toast=useToast();
  const [reports,setReports]=useState([
    {id:'RPT-001',title:'2월 안전관리 현황 보고서',type:'요약',template:'안전관리',status:'완료',date:'2026-02-10',pages:12},
    {id:'RPT-002',title:'가스설비 점검 분석 리포트',type:'분석',template:'설비점검',status:'완료',date:'2026-02-09',pages:24},
    {id:'RPT-003',title:'1분기 AI 활용 성과보고',type:'보고서',template:'성과분석',status:'생성 중',date:'2026-02-11',pages:0},
    {id:'RPT-004',title:'장비 유지보수 매뉴얼 번역',type:'번역',template:'기술문서',status:'완료',date:'2026-02-08',pages:45},
    {id:'RPT-005',title:'신입사원 교육자료 요약',type:'요약',template:'교육',status:'대기 중',date:'2026-02-11',pages:0},
  ]);
  const [showCreate,setShowCreate]=useState(false);const [detail,setDetail]=useState(null);
  const [form,setForm]=useState({title:'',type:'요약',template:'안전관리',source:''});
  return (
    <PageShell breadcrumb={['애플리케이션','보고서 생성']} title="보고서 생성" action={<button onClick={()=>setShowCreate(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center"><Plus size={16} className="mr-1"/>새 보고서</button>}>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[{l:'전체 보고서',v:reports.length,c:'bg-blue-50 text-blue-700'},{l:'생성 완료',v:reports.filter(r=>r.status==='완료').length,c:'bg-green-50 text-green-700'},{l:'총 페이지',v:reports.reduce((a,r)=>a+r.pages,0),c:'bg-purple-50 text-purple-700'}].map((s,i)=>(
          <div key={i} className={`p-4 rounded-xl ${s.c}`}><div className="text-2xl font-bold">{s.v}</div><div className="text-xs mt-1 opacity-80">{s.l}</div></div>
        ))}
      </div>
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm"><thead className="bg-gray-50 text-xs text-gray-500 uppercase"><tr>
          <th className="px-4 py-3 text-left">ID</th><th className="px-4 py-3 text-left">제목</th><th className="px-4 py-3 text-left">유형</th><th className="px-4 py-3 text-left">템플릿</th><th className="px-4 py-3 text-right">페이지</th><th className="px-4 py-3 text-left">상태</th>
        </tr></thead><tbody className="divide-y">{reports.map(r=>(
          <tr key={r.id} className="hover:bg-gray-50 cursor-pointer" onClick={()=>setDetail(r)}>
            <td className="px-4 py-3 font-mono text-xs">{r.id}</td><td className="px-4 py-3 font-medium">{r.title}</td>
            <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded ${r.type==='요약'?'bg-blue-50 text-blue-700':r.type==='분석'?'bg-purple-50 text-purple-700':r.type==='번역'?'bg-green-50 text-green-700':'bg-orange-50 text-orange-700'}`}>{r.type}</span></td>
            <td className="px-4 py-3 text-gray-500">{r.template}</td><td className="px-4 py-3 text-right">{r.pages||'-'}</td><td className="px-4 py-3"><StatusBadge status={r.status}/></td>
          </tr>
        ))}</tbody></table>
      </div>
      <Modal isOpen={showCreate} onClose={()=>setShowCreate(false)} title="새 보고서 생성" size="md">
        <div className="space-y-4">
          <div><label className="block text-sm font-medium mb-1">제목</label><input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="보고서 제목" className="w-full border rounded-lg px-3 py-2 text-sm"/></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium mb-1">유형</label><select value={form.type} onChange={e=>setForm({...form,type:e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm"><option>요약</option><option>분석</option><option>보고서</option><option>번역</option></select></div>
            <div><label className="block text-sm font-medium mb-1">템플릿</label><select value={form.template} onChange={e=>setForm({...form,template:e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm"><option>안전관리</option><option>설비점검</option><option>성과분석</option><option>기술문서</option><option>교육</option></select></div>
          </div>
          <div><label className="block text-sm font-medium mb-1">데이터 소스</label><input value={form.source} onChange={e=>setForm({...form,source:e.target.value})} placeholder="데이터셋 또는 문서명" className="w-full border rounded-lg px-3 py-2 text-sm"/></div>
          <button onClick={()=>{if(!form.title)return;setReports(p=>[{id:`RPT-${String(p.length+1).padStart(3,'0')}`,title:form.title,type:form.type,template:form.template,status:'생성 중',date:'2026-02-11',pages:0},...p]);setShowCreate(false);setForm({title:'',type:'요약',template:'안전관리',source:''});toast('보고서 생성이 시작되었습니다');}} className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium text-sm">생성 시작</button>
        </div>
      </Modal>
      <Modal isOpen={!!detail} onClose={()=>setDetail(null)} title={detail?.title} size="lg">
        {detail&&<div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">{[['유형',detail.type],['템플릿',detail.template],['생성일',detail.date],['페이지 수',detail.pages||'생성 중'],['상태',detail.status],['ID',detail.id]].map(([k,v],i)=>(
            <div key={i} className="bg-gray-50 p-3 rounded-lg"><div className="text-xs text-gray-400">{k}</div><div className="font-medium">{v}</div></div>
          ))}</div>
          {detail.status==='완료'&&<button onClick={()=>{toast('보고서를 다운로드합니다');setDetail(null);}} className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium">다운로드</button>}
        </div>}
      </Modal>
    </PageShell>
  );
};

const DataAnalysisPage = () => {
  const toast=useToast();
  const [showCreate,setShowCreate]=useState(false);
  const [form,setForm]=useState({file:'',type:'CSV',method:'통계분석'});
  const templates=[
    {name:'통계 분석',desc:'기초 통계량, 분포, 상관관계 분석',icon:'📊',color:'bg-blue-50 border-blue-200'},
    {name:'이상치 탐지',desc:'데이터 이상값 자동 탐지 및 시각화',icon:'🔍',color:'bg-red-50 border-red-200'},
    {name:'트렌드 분석',desc:'시계열 추세 및 패턴 분석',icon:'📈',color:'bg-green-50 border-green-200'},
    {name:'텍스트 분석',desc:'자연어 텍스트 감성 및 토픽 분석',icon:'📝',color:'bg-purple-50 border-purple-200'},
  ];
  return (
    <PageShell breadcrumb={['애플리케이션','데이터 분석']} title="데이터 분석" action={<button onClick={()=>setShowCreate(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center"><Plus size={16} className="mr-1"/>새 분석</button>}>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[{l:'총 분석 작업',v:47,c:'bg-blue-50 text-blue-700'},{l:'이번 주 실행',v:12,c:'bg-green-50 text-green-700'},{l:'평균 처리시간',v:'2.3분',c:'bg-purple-50 text-purple-700'}].map((s,i)=>(
          <div key={i} className={`p-4 rounded-xl ${s.c}`}><div className="text-2xl font-bold">{s.v}</div><div className="text-xs mt-1 opacity-80">{s.l}</div></div>
        ))}
      </div>
      <h3 className="font-bold mb-3">분석 템플릿</h3>
      <div className="grid grid-cols-2 gap-4 mb-6">{templates.map((t,i)=>(
        <div key={i} className={`p-5 rounded-xl border cursor-pointer hover:shadow-md transition-all ${t.color}`} onClick={()=>{setForm({...form,method:t.name});setShowCreate(true);}}>
          <div className="text-2xl mb-2">{t.icon}</div>
          <h4 className="font-bold text-sm mb-1">{t.name}</h4>
          <p className="text-xs text-gray-500">{t.desc}</p>
        </div>
      ))}</div>
      <Modal isOpen={showCreate} onClose={()=>setShowCreate(false)} title="새 분석 작업" size="md">
        <div className="space-y-4">
          <div><label className="block text-sm font-medium mb-1">파일 이름</label><input value={form.file} onChange={e=>setForm({...form,file:e.target.value})} placeholder="분석할 파일명" className="w-full border rounded-lg px-3 py-2 text-sm"/></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium mb-1">파일 유형</label><select value={form.type} onChange={e=>setForm({...form,type:e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm"><option>CSV</option><option>Excel</option><option>JSON</option><option>Parquet</option></select></div>
            <div><label className="block text-sm font-medium mb-1">분석 방법</label><select value={form.method} onChange={e=>setForm({...form,method:e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm"><option>통계분석</option><option>이상치 탐지</option><option>트렌드 분석</option><option>텍스트 분석</option></select></div>
          </div>
          <button onClick={()=>{setShowCreate(false);toast('분석 작업이 시작되었습니다');}} className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium text-sm">분석 시작</button>
        </div>
      </Modal>
    </PageShell>
  );
};

// ==================== OPS PAGES ====================
const ApprovalPage = () => {
  const toast=useToast();
  const [requests,setRequests]=useState([
    {id:'APR-101',type:'모델 배포',user:'김철수',dept:'AI연구소',date:'2026-02-09',status:'대기 중',desc:'GPT-OSS-120B 모델 운영 환경 배포 요청'},
    {id:'APR-102',type:'GPU 할당',user:'이영희',dept:'개발팀',date:'2026-02-10',status:'대기 중',desc:'VLM 학습을 위한 A100 x4 GPU 할당 요청'},
    {id:'APR-100',type:'GPU 할당',user:'이영희',dept:'개발팀',date:'2026-02-08',status:'승인',desc:'임베딩 학습용 GPU 할당'},
    {id:'APR-099',type:'데이터 접근',user:'박지민',dept:'안전관리',date:'2026-02-07',status:'승인',desc:'안전 규정 데이터셋 접근 권한 요청'},
    {id:'APR-098',type:'API 키 발급',user:'최준호',dept:'경영기획',date:'2026-02-06',status:'거부',desc:'외부 API 키 발급 요청'},
  ]);
  const [tab,setTab]=useState('전체');const [confirmAction,setConfirmAction]=useState(null);const [rejectReason,setRejectReason]=useState('');
  const filtered=tab==='전체'?requests:requests.filter(r=>r.status===tab);
  const counts={total:requests.length,pending:requests.filter(r=>r.status==='대기 중').length,approved:requests.filter(r=>r.status==='승인').length,rejected:requests.filter(r=>r.status==='거부').length};
  return (
    <PageShell breadcrumb={['운영','승인']} title="승인 관리">
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[{l:'전체',v:counts.total,c:'bg-gray-50 text-gray-700'},{l:'대기 중',v:counts.pending,c:'bg-yellow-50 text-yellow-700'},{l:'승인',v:counts.approved,c:'bg-green-50 text-green-700'},{l:'거부',v:counts.rejected,c:'bg-red-50 text-red-700'}].map((s,i)=>(
          <div key={i} className={`p-4 rounded-xl ${s.c}`}><div className="text-2xl font-bold">{s.v}</div><div className="text-xs mt-1 opacity-80">{s.l}</div></div>
        ))}
      </div>
      <div className="flex space-x-1 mb-4 border-b">{['전체','대기 중','승인','거부'].map(t=>(
        <button key={t} onClick={()=>setTab(t)} className={`px-4 py-2 text-sm font-medium border-b-2 ${tab===t?'border-blue-600 text-blue-600':'border-transparent text-gray-500 hover:text-gray-800'}`}>{t}</button>
      ))}</div>
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm"><thead className="bg-gray-50 text-xs text-gray-500 uppercase"><tr>
          <th className="px-4 py-3 text-left">요청 ID</th><th className="px-4 py-3 text-left">유형</th><th className="px-4 py-3 text-left">요청자</th><th className="px-4 py-3 text-left">부서</th><th className="px-4 py-3 text-left">요청일</th><th className="px-4 py-3 text-left">상태</th><th className="px-4 py-3 text-center">액션</th>
        </tr></thead><tbody className="divide-y">{filtered.map(r=>(
          <tr key={r.id} className="hover:bg-gray-50">
            <td className="px-4 py-3 font-mono text-xs">{r.id}</td><td className="px-4 py-3 font-medium">{r.type}</td><td className="px-4 py-3">{r.user}</td><td className="px-4 py-3 text-gray-500">{r.dept}</td><td className="px-4 py-3 text-gray-500">{r.date}</td><td className="px-4 py-3"><StatusBadge status={r.status}/></td>
            <td className="px-4 py-3 text-center space-x-2">
              {r.status==='대기 중'&&<>
                <button onClick={()=>setConfirmAction({req:r,action:'approve'})} className="text-xs px-2 py-1 rounded bg-green-50 text-green-600 hover:bg-green-100 font-medium">승인</button>
                <button onClick={()=>setConfirmAction({req:r,action:'reject'})} className="text-xs px-2 py-1 rounded bg-red-50 text-red-600 hover:bg-red-100 font-medium">거부</button>
              </>}
            </td>
          </tr>
        ))}</tbody></table>
      </div>
      {confirmAction?.action==='approve'&&<ConfirmDialog isOpen={true} onClose={()=>setConfirmAction(null)} onConfirm={()=>{setRequests(p=>p.map(x=>x.id===confirmAction.req.id?{...x,status:'승인'}:x));setConfirmAction(null);toast(`${confirmAction.req.id} 승인 완료`);}} title="요청 승인" message={`${confirmAction.req.user}의 "${confirmAction.req.type}" 요청을 승인하시겠습니까?\n\n상세: ${confirmAction.req.desc}`} confirmText="승인"/>}
      {confirmAction?.action==='reject'&&<Modal isOpen={true} onClose={()=>{setConfirmAction(null);setRejectReason('');}} title="요청 거부" size="md">
        <div className="space-y-4">
          <p className="text-sm text-gray-600">{confirmAction.req.user}의 "{confirmAction.req.type}" 요청을 거부합니다.</p>
          <div><label className="block text-sm font-medium mb-1">거부 사유</label><textarea value={rejectReason} onChange={e=>setRejectReason(e.target.value)} rows={3} placeholder="거부 사유를 입력하세요..." className="w-full border rounded-lg px-3 py-2 text-sm"/></div>
          <button onClick={()=>{setRequests(p=>p.map(x=>x.id===confirmAction.req.id?{...x,status:'거부'}:x));setConfirmAction(null);setRejectReason('');toast(`${confirmAction.req.id} 거부 완료`,'info');}} className="w-full bg-red-600 text-white py-2.5 rounded-lg font-medium text-sm">거부</button>
        </div>
      </Modal>}
    </PageShell>
  );
};

const QuotaPage = () => {
  const toast=useToast();
  const [depts,setDepts]=useState([
    {id:1,name:'AI연구소',gpu:{used:4,total:8},mem:{used:256,total:512},storage:{used:8,total:10}},
    {id:2,name:'IT개발팀',gpu:{used:1,total:2},mem:{used:64,total:256},storage:{used:3,total:5}},
    {id:3,name:'데이터분석팀',gpu:{used:2,total:4},mem:{used:180,total:256},storage:{used:4.5,total:5}},
    {id:4,name:'서비스운영팀',gpu:{used:0,total:1},mem:{used:32,total:128},storage:{used:1,total:5}},
    {id:5,name:'경영기획팀',gpu:{used:0,total:1},mem:{used:16,total:64},storage:{used:0.5,total:2}},
    {id:6,name:'안전관리처',gpu:{used:1,total:2},mem:{used:96,total:128},storage:{used:2,total:3}},
  ]);
  const [editDept,setEditDept]=useState(null);
  const pct=(u,t)=>Math.round(u/t*100);
  return (
    <PageShell breadcrumb={['운영','할당량']} title="부서별 리소스 할당량 관리">
      <div className="grid grid-cols-3 gap-4">{depts.map(d=>(
        <div key={d.id} className="bg-white p-5 rounded-xl border">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold">{d.name}</h3>
            <button onClick={()=>setEditDept({...d})} className="text-xs text-blue-600 hover:underline">수정</button>
          </div>
          <div className="space-y-3">{[
            {l:'GPU',u:d.gpu.used,t:d.gpu.total,unit:'개',color:'bg-blue-500'},
            {l:'메모리',u:d.mem.used,t:d.mem.total,unit:'GB',color:'bg-purple-500'},
            {l:'스토리지',u:d.storage.used,t:d.storage.total,unit:'TB',color:'bg-green-500'},
          ].map((r,j)=>{const p=pct(r.u,r.t);return(
            <div key={j}><div className="flex justify-between text-xs mb-1"><span className="text-gray-500">{r.l}</span><div className="flex items-center space-x-1"><span className="font-medium">{r.u}/{r.t} {r.unit}</span>{p>=80&&<span className="text-xs px-1.5 py-0.5 rounded bg-red-100 text-red-600 font-medium">⚠ {p}%</span>}</div></div>
              <div className="w-full bg-gray-100 rounded-full h-1.5"><div className={`h-1.5 rounded-full ${p>=80?'bg-red-500':r.color}`} style={{width:`${p}%`}}/></div></div>
          );})}</div>
        </div>
      ))}</div>
      <Modal isOpen={!!editDept} onClose={()=>setEditDept(null)} title={`${editDept?.name} 할당량 수정`} size="md">
        {editDept&&<div className="space-y-4">
          <div><label className="block text-sm font-medium mb-2">GPU 할당량</label>
            <input type="range" min={1} max={16} value={editDept.gpu.total} onChange={e=>setEditDept({...editDept,gpu:{...editDept.gpu,total:+e.target.value}})} className="w-full"/>
            <div className="text-right text-sm font-medium">{editDept.gpu.total}개</div></div>
          <div><label className="block text-sm font-medium mb-2">메모리 할당량</label>
            <input type="range" min={64} max={1024} step={64} value={editDept.mem.total} onChange={e=>setEditDept({...editDept,mem:{...editDept.mem,total:+e.target.value}})} className="w-full"/>
            <div className="text-right text-sm font-medium">{editDept.mem.total} GB</div></div>
          <div><label className="block text-sm font-medium mb-2">스토리지 할당량</label>
            <input type="range" min={1} max={20} value={editDept.storage.total} onChange={e=>setEditDept({...editDept,storage:{...editDept.storage,total:+e.target.value}})} className="w-full"/>
            <div className="text-right text-sm font-medium">{editDept.storage.total} TB</div></div>
          <button onClick={()=>{setDepts(p=>p.map(x=>x.id===editDept.id?editDept:x));setEditDept(null);toast('할당량이 저장되었습니다');}} className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium text-sm">저장</button>
        </div>}
      </Modal>
    </PageShell>
  );
};

// ==================== ADMIN PAGES ====================
const UserManagementPage = () => {
  const [selUser,setSelUser]=useState(null);
  const [tab,setTab]=useState('users');
  const roleBadge=r=>r==='시스템관리자'?'bg-red-50 text-red-700':r==='부서관리자'?'bg-blue-50 text-blue-700':'bg-gray-100 text-gray-600';
  return (
    <PageShell breadcrumb={['관리자 전용','사용자 관리']} title="사용자 및 권한 관리" action={<button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center"><UserPlus size={16} className="mr-1.5"/>사용자 추가</button>}>
      <div className="flex space-x-1 mb-5 border-b">
        {[['users','사용자 목록'],['permissions','권한 요청'],['roles','역할 관리']].map(([k,l])=>(
          <button key={k} onClick={()=>setTab(k)} className={`px-5 py-2.5 text-sm font-medium border-b-2 transition-colors ${tab===k?'border-blue-600 text-blue-600':'border-transparent text-gray-500 hover:text-gray-800'}`}>{l}</button>
        ))}
      </div>
      {tab==='users'&&<>
        <div className="flex items-center space-x-3 mb-4">
          <div className="relative flex-1 max-w-sm"><input placeholder="이름, 부서, 이메일 검색..." className="w-full pl-9 pr-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"/><Search size={16} className="absolute left-3 top-3 text-gray-400"/></div>
          <select className="px-3 py-2.5 border rounded-lg text-sm bg-white"><option>전체 역할</option><option>시스템관리자</option><option>부서관리자</option><option>일반사용자</option></select>
        </div>
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <table className="w-full text-sm"><thead className="bg-gray-50/80"><tr>
            <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500">ID</th>
            <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500">이름</th>
            <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500">부서</th>
            <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500">역할</th>
            <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500">이메일</th>
            <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500">최근 로그인</th>
            <th className="px-5 py-3.5 text-right text-xs font-medium text-gray-500">API 호출</th>
            <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500">상태</th>
          </tr></thead><tbody className="divide-y divide-gray-100">{MOCK_USERS.map(u=>(
            <tr key={u.id} className="hover:bg-gray-50/50 cursor-pointer" onClick={()=>setSelUser(u)}>
              <td className="px-5 py-3.5 font-mono text-xs text-gray-400">{u.id}</td>
              <td className="px-5 py-3.5 font-medium">{u.name}</td>
              <td className="px-5 py-3.5 text-gray-600">{u.dept}</td>
              <td className="px-5 py-3.5"><span className={`px-2 py-0.5 rounded-md text-xs font-medium ${roleBadge(u.role)}`}>{u.role}</span></td>
              <td className="px-5 py-3.5 text-gray-500 text-xs">{u.email}</td>
              <td className="px-5 py-3.5 text-gray-400 text-xs">{u.lastLogin}</td>
              <td className="px-5 py-3.5 text-right font-medium">{u.apiCalls.toLocaleString()}</td>
              <td className="px-5 py-3.5"><StatusBadge status={u.status}/></td>
            </tr>
          ))}</tbody></table>
        </div>
      </>}
      {tab==='permissions'&&<div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <table className="w-full text-sm"><thead className="bg-gray-50/80"><tr>
          <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500">요청 ID</th>
          <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500">요청자</th>
          <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500">부서</th>
          <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500">유형</th>
          <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500">대상</th>
          <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500">요청일</th>
          <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500">상태</th>
          <th className="px-5 py-3.5 text-center text-xs font-medium text-gray-500">처리</th>
        </tr></thead><tbody className="divide-y divide-gray-100">{MOCK_PERMISSION_REQUESTS.map(p=>(
          <tr key={p.id} className="hover:bg-gray-50/50">
            <td className="px-5 py-3.5 font-mono text-xs text-gray-400">{p.id}</td>
            <td className="px-5 py-3.5 font-medium">{p.user}</td>
            <td className="px-5 py-3.5 text-gray-600">{p.dept}</td>
            <td className="px-5 py-3.5"><span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded-md text-xs font-medium">{p.type}</span></td>
            <td className="px-5 py-3.5 text-gray-500">{p.target}</td>
            <td className="px-5 py-3.5 text-gray-400">{p.date}</td>
            <td className="px-5 py-3.5"><StatusBadge status={p.status}/></td>
            <td className="px-5 py-3.5 text-center">{p.status==='대기 중'&&<div className="flex space-x-1 justify-center">
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700">승인</button>
              <button className="px-3 py-1 border border-red-200 text-red-600 rounded text-xs font-medium hover:bg-red-50">거부</button>
            </div>}</td>
          </tr>
        ))}</tbody></table>
      </div>}
      {tab==='roles'&&<div className="grid grid-cols-3 gap-5">
        {[{role:'시스템관리자',desc:'전체 시스템 관리 및 설정 권한',perms:['전체 메뉴 접근','사용자 관리','모델 관리','시스템 설정','통계 조회'],count:2,color:'bg-red-50 border-red-200'},
          {role:'부서관리자',desc:'소속 부서 리소스 관리 권한',perms:['부서 에이전트 관리','지식영역 관리','부서원 권한 관리','사용 통계 조회'],count:3,color:'bg-blue-50 border-blue-200'},
          {role:'일반사용자',desc:'기본 서비스 이용 권한',perms:['에이전트 질의','개인 지식영역','채팅 애플리케이션','보고서 생성'],count:3,color:'bg-gray-50 border-gray-200'}
        ].map((r,i)=>(
          <div key={i} className={`p-5 rounded-xl border ${r.color}`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm">{r.role}</h3>
              <span className="text-xs bg-white px-2 py-0.5 rounded-full border">{r.count}명</span>
            </div>
            <p className="text-xs text-gray-500 mb-4">{r.desc}</p>
            <div className="space-y-1.5">{r.perms.map((p,j)=>(
              <div key={j} className="flex items-center text-xs text-gray-600"><Check size={12} className="mr-1.5 text-green-500 shrink-0"/>{p}</div>
            ))}</div>
          </div>
        ))}
      </div>}
      <Modal isOpen={!!selUser} onClose={()=>setSelUser(null)} title={`${selUser?.name} 상세 정보`} size="md">
        {selUser&&<div className="space-y-5">
          <div className="flex items-center space-x-4 pb-4 border-b">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white text-lg font-bold">{selUser.name[0]}</div>
            <div><div className="font-bold text-lg">{selUser.name}</div><div className="text-sm text-gray-500">{selUser.dept} · {selUser.role}</div><div className="text-xs text-gray-400 mt-0.5">{selUser.email}</div></div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-blue-50 rounded-lg p-3 text-center"><div className="text-xl font-bold text-blue-700">{selUser.loginCount}</div><div className="text-xs text-blue-500">총 로그인</div></div>
            <div className="bg-green-50 rounded-lg p-3 text-center"><div className="text-xl font-bold text-green-700">{selUser.apiCalls.toLocaleString()}</div><div className="text-xs text-green-500">API 호출</div></div>
            <div className="bg-purple-50 rounded-lg p-3 text-center"><div className="text-xl font-bold text-purple-700">{selUser.lastLogin.split(' ')[1]}</div><div className="text-xs text-purple-500">최근 접속</div></div>
          </div>
          <div className="flex space-x-2 pt-2">
            <button className="flex-1 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50">역할 변경</button>
            <button className="flex-1 py-2 border border-red-200 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50">{selUser.status==='Running'?'비활성화':'활성화'}</button>
          </div>
        </div>}
      </Modal>
    </PageShell>
  );
};

const KnowledgeManagementPage = () => {
  const [selKA,setSelKA]=useState(null);
  return (
    <PageShell breadcrumb={['관리자 전용','지식영역 관리']} title="지식영역 관리" action={<button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center"><Plus size={16} className="mr-1.5"/>지식영역 생성</button>}>
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[{l:'전체 지식영역',v:MOCK_KNOWLEDGE_AREAS.length,u:'개',c:'border-blue-500 bg-blue-50',tc:'text-blue-700'},
          {l:'총 문서 수',v:MOCK_KNOWLEDGE_AREAS.reduce((s,k)=>s+k.docs,0).toLocaleString(),u:'건',c:'border-green-500 bg-green-50',tc:'text-green-700'},
          {l:'총 청크 수',v:(MOCK_KNOWLEDGE_AREAS.reduce((s,k)=>s+k.chunks,0)/1000).toFixed(1)+'K',u:'',c:'border-purple-500 bg-purple-50',tc:'text-purple-700'},
          {l:'총 용량',v:'5.1',u:'GB',c:'border-orange-500 bg-orange-50',tc:'text-orange-700'}
        ].map((c,i)=>(
          <div key={i} className={`p-5 rounded-xl border-l-4 bg-white shadow-sm ${c.c}`}>
            <div className="text-xs text-gray-500 mb-1">{c.l}</div>
            <div className={`text-2xl font-bold ${c.tc}`}>{c.v}<span className="text-sm font-normal text-gray-400 ml-1">{c.u}</span></div>
          </div>
        ))}
      </div>
      <div className="space-y-3">{MOCK_KNOWLEDGE_AREAS.map(ka=>(
        <div key={ka.id} onClick={()=>setSelKA(ka)} className="bg-white p-5 rounded-xl border shadow-sm hover:shadow-md hover:border-blue-300 cursor-pointer transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center"><FolderTree size={20} className="text-purple-600"/></div>
              <div>
                <div className="flex items-center space-x-2"><h3 className="font-bold text-sm">{ka.name}</h3><StatusBadge status={ka.status}/></div>
                <p className="text-xs text-gray-500 mt-0.5">{ka.desc}</p>
              </div>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <div className="text-center"><div className="font-bold text-gray-800">{ka.docs}</div><div className="text-xs text-gray-400">문서</div></div>
              <div className="text-center"><div className="font-bold text-gray-800">{ka.chunks.toLocaleString()}</div><div className="text-xs text-gray-400">청크</div></div>
              <div className="text-center"><div className="font-bold text-gray-800">{ka.size}</div><div className="text-xs text-gray-400">용량</div></div>
              <div><div className="text-xs text-gray-400">관리 부서</div><div className="text-sm font-medium">{ka.owner}</div></div>
              <div><div className="text-xs text-gray-400">접근 권한</div><div className="flex flex-wrap gap-1 mt-0.5">{ka.access.map((a,j)=><span key={j} className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-xs">{a}</span>)}</div></div>
            </div>
          </div>
        </div>
      ))}</div>
      <Modal isOpen={!!selKA} onClose={()=>setSelKA(null)} title={`${selKA?.name} 지식영역 상세`} size="lg">
        {selKA&&<div className="space-y-5">
          <div className="grid grid-cols-4 gap-3">
            {[{l:'문서 수',v:selKA.docs},{l:'청크 수',v:selKA.chunks.toLocaleString()},{l:'용량',v:selKA.size},{l:'최종 업데이트',v:selKA.updated}].map((r,i)=>(
              <div key={i} className="bg-gray-50 rounded-lg p-3"><div className="text-xs text-gray-400">{r.l}</div><div className="font-bold mt-0.5">{r.v}</div></div>
            ))}
          </div>
          <div>
            <h4 className="font-bold text-sm mb-2">접근 권한 관리</h4>
            <div className="space-y-2">{selKA.access.map((a,i)=>(
              <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2.5">
                <div className="flex items-center space-x-2"><Users size={14} className="text-gray-400"/><span className="text-sm font-medium">{a}</span></div>
                <select className="text-xs border rounded px-2 py-1 bg-white"><option>읽기+쓰기</option><option>읽기 전용</option><option>접근 불가</option></select>
              </div>
            ))}</div>
            <button className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center"><Plus size={14} className="mr-1"/>부서 추가</button>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-2">문서 파이프라인 설정</h4>
            <div className="grid grid-cols-3 gap-3">
              <div><label className="text-xs text-gray-500">Chunk Size</label><input type="number" defaultValue={512} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"/></div>
              <div><label className="text-xs text-gray-500">Overlap</label><input type="number" defaultValue={50} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"/></div>
              <div><label className="text-xs text-gray-500">Embedding 모델</label><select className="w-full mt-1 px-3 py-2 border rounded-lg text-sm bg-white"><option>multilingual-e5-large</option></select></div>
            </div>
          </div>
          <div className="flex space-x-2 justify-end pt-2">
            <button className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center"><RefreshCw size={14} className="mr-1.5"/>재색인</button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">저장</button>
          </div>
        </div>}
      </Modal>
    </PageShell>
  );
};

const UsageStatsPage = () => {
  const [period,setPeriod]=useState('week');
  const maxQ=Math.max(...MOCK_USAGE_STATS.daily.map(d=>d.queries));
  return (
    <PageShell breadcrumb={['관리자 전용','이용 통계']} title="이용 통계 및 분석">
      <div className="flex items-center space-x-2 mb-5">
        {[['week','최근 7일'],['month','최근 30일'],['quarter','분기']].map(([k,l])=>(
          <button key={k} onClick={()=>setPeriod(k)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${period===k?'bg-blue-600 text-white':'bg-white border hover:bg-gray-50'}`}>{l}</button>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[{l:'총 질의 수',v:'11,470',c:'border-blue-500',tc:'text-blue-700',bg:'bg-blue-50',icon:MessageSquare},{l:'활성 사용자',v:'128',c:'border-green-500',tc:'text-green-700',bg:'bg-green-50',icon:Users},{l:'평균 응답시간',v:'1.1s',c:'border-purple-500',tc:'text-purple-700',bg:'bg-purple-50',icon:Clock},{l:'만족도',v:'4.2/5',c:'border-orange-500',tc:'text-orange-700',bg:'bg-orange-50',icon:Star}].map((c,i)=>(
          <div key={i} className={`p-5 rounded-xl border-l-4 bg-white shadow-sm ${c.c}`}>
            <div className="flex items-center justify-between mb-2"><span className="text-xs text-gray-500">{c.l}</span><c.icon size={16} className="text-gray-300"/></div>
            <div className={`text-2xl font-bold ${c.tc}`}>{c.v}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-5 mb-6">
        <div className="col-span-2 bg-white rounded-xl border shadow-sm p-5">
          <h3 className="font-bold text-sm mb-4">일별 질의량 추이</h3>
          <div className="flex items-end space-x-2 h-40">
            {MOCK_USAGE_STATS.daily.map((d,i)=>(
              <div key={i} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-blue-100 rounded-t-md relative" style={{height:`${(d.queries/maxQ)*100}%`,minHeight:'4px'}}>
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-gray-500 font-medium whitespace-nowrap">{d.queries}</div>
                </div>
                <div className="text-[10px] text-gray-400 mt-1.5 font-medium">{d.date}</div>
                <div className="text-[10px] text-gray-300">{d.users}명</div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl border shadow-sm p-5">
          <h3 className="font-bold text-sm mb-4">부서별 이용 현황</h3>
          <div className="space-y-3">{MOCK_USAGE_STATS.byDept.map((d,i)=>(
            <div key={i}>
              <div className="flex justify-between text-xs mb-1"><span className="text-gray-600 font-medium">{d.dept}</span><span className="text-gray-500">{d.queries.toLocaleString()}건 ({d.pct}%)</span></div>
              <div className="w-full bg-gray-100 rounded-full h-2"><div className="bg-blue-500 h-2 rounded-full" style={{width:`${d.pct*100/28}%`}}/></div>
            </div>
          ))}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5 mb-6">
        <div className="bg-white rounded-xl border shadow-sm p-5">
          <h3 className="font-bold text-sm mb-4">모델별 사용량</h3>
          <div className="space-y-3">{MOCK_USAGE_STATS.byModel.map((m,i)=>(
            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2"><Cpu size={14} className="text-gray-400"/><span className="text-sm font-medium">{m.model}</span></div>
              <div className="flex items-center space-x-3"><span className="text-sm font-bold">{m.queries.toLocaleString()}</span><span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-medium">{m.pct}%</span></div>
            </div>
          ))}</div>
        </div>
        <div className="bg-white rounded-xl border shadow-sm p-5">
          <h3 className="font-bold text-sm mb-4">인기 검색 키워드 (Top 10)</h3>
          <div className="flex flex-wrap gap-2">{MOCK_USAGE_STATS.topKeywords.map((kw,i)=>(
            <span key={i} className={`px-3 py-1.5 rounded-full border text-sm font-medium ${i<3?'bg-blue-50 text-blue-700 border-blue-200':'bg-gray-50 text-gray-600 border-gray-200'}`}>
              <Hash size={12} className="inline mr-1"/>{kw}
            </span>
          ))}</div>
        </div>
      </div>

      {/* Hourly distribution + Cost analysis */}
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2 bg-white rounded-xl border shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sm">시간대별 사용 분포</h3>
            <span className="text-xs text-gray-400">평일 평균 · KST</span>
          </div>
          <div className="flex items-end space-x-1.5 h-32">
            {MOCK_USAGE_HOURLY.map((h,i)=>{
              const max=Math.max(...MOCK_USAGE_HOURLY.map(x=>x.v));
              const pct=(h.v/max)*100;
              return (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div className="w-full rounded-t-md transition-all" style={{height:`${pct}%`,minHeight:'2px',background:pct>70?'#3b82f6':pct>40?'#60a5fa':'#bfdbfe'}} title={`${h.h}시: ${h.v}`}/>
                  <div className="text-[10px] text-gray-400 mt-1 font-medium">{h.h}</div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 pt-3 border-t flex items-center justify-around text-xs text-gray-500">
            <div><span className="font-bold text-blue-600">14시</span> 피크</div>
            <div><span className="font-bold text-gray-700">10-16시</span> 업무 집중 시간</div>
            <div><span className="font-bold text-gray-700">94%</span> 업무 시간 내 사용</div>
          </div>
        </div>
        <div className="bg-white rounded-xl border shadow-sm p-5">
          <h3 className="font-bold text-sm mb-4 flex items-center"><FileBarChart size={14} className="mr-1.5 text-purple-600"/>비용 분석 (월간)</h3>
          <div className="bg-purple-50 rounded-lg p-3 mb-3 text-center">
            <div className="text-[11px] text-purple-600 font-medium">예상 월 비용</div>
            <div className="text-2xl font-bold text-purple-700">₩{MOCK_COST_BREAKDOWN.reduce((s,m)=>s+m.cost,0).toLocaleString()},000</div>
            <div className="text-[10px] text-purple-500 mt-0.5">전월 대비 +8.2%</div>
          </div>
          <div className="space-y-2">
            {MOCK_COST_BREAKDOWN.map((m,i)=>(
              <div key={i}>
                <div className="flex justify-between text-xs mb-1"><span className="text-gray-600 font-medium">{m.model}</span><span className="text-gray-500">₩{m.cost.toLocaleString()},000 ({m.share}%)</span></div>
                <div className="w-full bg-gray-100 rounded-full h-1.5"><div className="bg-purple-500 h-1.5 rounded-full" style={{width:`${m.share}%`}}/></div>
                <div className="text-[10px] text-gray-400 mt-0.5">{m.tokens} tokens</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROI metrics */}
      <div className="mt-6 grid grid-cols-4 gap-4">
        {[
          {l:'업무 자동화 효과',v:'382h',sub:'월간 절감 시간',color:'bg-green-50 text-green-700 border-green-200',icon:Clock},
          {l:'예상 비용 절감',v:'₩4.2M',sub:'인건비 환산',color:'bg-blue-50 text-blue-700 border-blue-200',icon:TrendingUp},
          {l:'질의 정답률',v:'94.2%',sub:'전문가 검증',color:'bg-purple-50 text-purple-700 border-purple-200',icon:CheckCircle},
          {l:'사용자 만족도',v:'4.3/5',sub:'설문 응답 142건',color:'bg-orange-50 text-orange-700 border-orange-200',icon:Star},
        ].map((s,i)=>(
          <div key={i} className={`p-4 rounded-xl border-2 ${s.color}`}>
            <div className="flex items-center justify-between mb-1.5"><span className="text-xs font-medium">{s.l}</span><s.icon size={14}/></div>
            <div className="text-2xl font-bold">{s.v}</div>
            <div className="text-[11px] opacity-70 mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>
    </PageShell>
  );
};

const AccessLogPage = () => (
  <PageShell breadcrumb={['관리자 전용','접근 로그']} title="접근 및 감사 로그">
    <div className="flex items-center space-x-3 mb-4">
      <div className="relative flex-1 max-w-sm"><input placeholder="사용자, 부서, IP 검색..." className="w-full pl-9 pr-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"/><Search size={16} className="absolute left-3 top-3 text-gray-400"/></div>
      <select className="px-3 py-2.5 border rounded-lg text-sm bg-white"><option>전체 액션</option><option>로그인</option><option>에이전트 호출</option><option>설정 변경</option><option>문서 업로드</option></select>
      <select className="px-3 py-2.5 border rounded-lg text-sm bg-white"><option>오늘</option><option>최근 7일</option><option>최근 30일</option></select>
    </div>
    <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
      <table className="w-full text-sm"><thead className="bg-gray-50/80"><tr>
        <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500">시간</th>
        <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500">사용자</th>
        <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500">부서</th>
        <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500">액션</th>
        <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500">IP</th>
        <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500">상세</th>
      </tr></thead><tbody className="divide-y divide-gray-100">{MOCK_ACCESS_LOGS.map(l=>(
        <tr key={l.id} className="hover:bg-gray-50/50">
          <td className="px-5 py-3.5 font-mono text-xs text-gray-400">{l.time}</td>
          <td className="px-5 py-3.5 font-medium">{l.user}</td>
          <td className="px-5 py-3.5 text-gray-600 text-xs">{l.dept}</td>
          <td className="px-5 py-3.5"><span className={`px-2 py-0.5 rounded-md text-xs font-medium ${l.action==='로그인'?'bg-green-50 text-green-700':l.action==='에이전트 호출'?'bg-blue-50 text-blue-700':l.action==='설정 변경'?'bg-orange-50 text-orange-700':'bg-purple-50 text-purple-700'}`}>{l.action}</span></td>
          <td className="px-5 py-3.5 font-mono text-xs text-gray-400">{l.ip}</td>
          <td className="px-5 py-3.5 text-gray-500 text-xs">{l.detail}</td>
        </tr>
      ))}</tbody></table>
    </div>
  </PageShell>
);

const QualityManagementPage = () => {
  const [selReview,setSelReview]=useState(null);
  const ratingIcon=r=>r==='good'?<ThumbsUp size={14} className="text-green-600"/>:r==='bad'?<ThumbsDown size={14} className="text-red-600"/>:<Edit3 size={14} className="text-orange-500"/>;
  const ratingLabel=r=>r==='good'?'정확':r==='bad'?'할루시네이션':'수정 필요';
  const ratingBg=r=>r==='good'?'bg-green-50 text-green-700':r==='bad'?'bg-red-50 text-red-700':'bg-orange-50 text-orange-700';
  const good=MOCK_QUALITY_REVIEWS.filter(r=>r.rating==='good').length;
  const edit=MOCK_QUALITY_REVIEWS.filter(r=>r.rating==='edit').length;
  const bad=MOCK_QUALITY_REVIEWS.filter(r=>r.rating==='bad').length;
  return (
    <PageShell breadcrumb={['관리자 전용','AI 품질 관리']} title="AI 답변 품질 관리">
      <div className="grid grid-cols-5 gap-4 mb-6">
        {[{l:'총 검토 건수',v:MOCK_QUALITY_REVIEWS.length,c:'border-blue-500 bg-blue-50',tc:'text-blue-700'},
          {l:'정확',v:good,c:'border-green-500 bg-green-50',tc:'text-green-700'},
          {l:'수정 필요',v:edit,c:'border-orange-500 bg-orange-50',tc:'text-orange-700'},
          {l:'할루시네이션',v:bad,c:'border-red-500 bg-red-50',tc:'text-red-700'},
          {l:'평균 신뢰도',v:((MOCK_QUALITY_REVIEWS.reduce((s,r)=>s+r.confidence,0)/MOCK_QUALITY_REVIEWS.length)*100).toFixed(0)+'%',c:'border-purple-500 bg-purple-50',tc:'text-purple-700'}
        ].map((c,i)=>(
          <div key={i} className={`p-4 rounded-xl border-l-4 bg-white shadow-sm ${c.c}`}>
            <div className="text-xs text-gray-500 mb-1">{c.l}</div>
            <div className={`text-xl font-bold ${c.tc}`}>{c.v}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-5 mb-6">
        <div className="col-span-2">
          <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
            <div className="px-5 py-3 bg-gray-50/80 border-b flex items-center justify-between">
              <h3 className="font-bold text-sm">전문가 검토 내역</h3>
              <select className="text-xs border rounded px-2 py-1 bg-white"><option>전체</option><option>정확</option><option>수정 필요</option><option>할루시네이션</option></select>
            </div>
            <div className="divide-y">{MOCK_QUALITY_REVIEWS.map(r=>(
              <div key={r.id} onClick={()=>setSelReview(r)} className="px-5 py-4 hover:bg-gray-50/50 cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className={`flex items-center space-x-1 px-2 py-0.5 rounded-md text-xs font-medium ${ratingBg(r.rating)}`}>{ratingIcon(r.rating)}<span className="ml-1">{ratingLabel(r.rating)}</span></span>
                    <span className="text-xs text-gray-400">{r.agent}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <span>신뢰도: <span className={`font-bold ${r.confidence>=0.9?'text-green-600':r.confidence>=0.7?'text-orange-500':'text-red-600'}`}>{(r.confidence*100).toFixed(0)}%</span></span>
                    <span>{r.date}</span>
                  </div>
                </div>
                <div className="text-sm font-medium mb-1">Q: {r.query}</div>
                <div className="text-xs text-gray-500 truncate">A: {r.answer}</div>
                {r.feedback&&<div className="text-xs text-orange-600 mt-1 flex items-center"><Edit3 size={10} className="mr-1"/>{r.feedback}</div>}
              </div>
            ))}</div>
          </div>
        </div>
        <div className="space-y-5">
          <div className="bg-white rounded-xl border shadow-sm p-5">
            <h3 className="font-bold text-sm mb-4">신뢰도 임계값 설정</h3>
            <div className="space-y-4">
              <div><label className="text-xs text-gray-500">자동 응답 임계값</label><div className="flex items-center space-x-2 mt-1"><input type="range" min="0" max="100" defaultValue="80" className="flex-1"/><span className="text-sm font-bold text-blue-600">80%</span></div><p className="text-xs text-gray-400 mt-1">이 값 이상이면 자동 응답, 미만이면 전문가 검토 요청</p></div>
              <div><label className="text-xs text-gray-500">할루시네이션 경고 임계값</label><div className="flex items-center space-x-2 mt-1"><input type="range" min="0" max="100" defaultValue="60" className="flex-1"/><span className="text-sm font-bold text-red-600">60%</span></div><p className="text-xs text-gray-400 mt-1">이 값 미만이면 할루시네이션 경고 표시</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl border shadow-sm p-5">
            <h3 className="font-bold text-sm mb-3">Golden Data 관리</h3>
            <p className="text-xs text-gray-500 mb-3">검증된 Q&A 쌍을 골든 데이터로 등록하여 답변 품질을 개선합니다.</p>
            <div className="flex items-center justify-between bg-blue-50 rounded-lg p-3 mb-2"><span className="text-sm font-medium text-blue-700">등록된 골든 데이터</span><span className="text-lg font-bold text-blue-700">247<span className="text-xs font-normal text-blue-500 ml-1">건</span></span></div>
            <button className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-blue-400 hover:text-blue-600">+ 골든 데이터 등록</button>
          </div>
        </div>
      </div>
      <Modal isOpen={!!selReview} onClose={()=>setSelReview(null)} title="답변 상세 검토" size="lg">
        {selReview&&<div className="space-y-5">
          <div className="flex items-center space-x-3 pb-3 border-b">
            <span className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-sm font-medium ${ratingBg(selReview.rating)}`}>{ratingIcon(selReview.rating)}<span className="ml-1">{ratingLabel(selReview.rating)}</span></span>
            <span className="text-sm text-gray-500">{selReview.agent}</span>
            <span className="text-sm text-gray-400">검토자: {selReview.reviewer}</span>
          </div>
          <div className="bg-blue-50 rounded-lg p-4"><div className="text-xs text-blue-600 font-bold mb-1">질문</div><div className="text-sm">{selReview.query}</div></div>
          <div className="bg-gray-50 rounded-lg p-4"><div className="text-xs text-gray-500 font-bold mb-1">AI 답변 (신뢰도: {(selReview.confidence*100).toFixed(0)}%)</div><div className="text-sm">{selReview.answer}</div></div>
          {selReview.feedback&&<div className="bg-orange-50 rounded-lg p-4"><div className="text-xs text-orange-600 font-bold mb-1">전문가 피드백</div><div className="text-sm text-orange-800">{selReview.feedback}</div></div>}
          <div className="flex space-x-2 justify-end pt-2">
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 flex items-center"><ThumbsUp size={14} className="mr-1.5"/>골든 데이터 등록</button>
            <button className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50">답변 수정</button>
          </div>
        </div>}
      </Modal>
    </PageShell>
  );
};

const AnnouncementPage = () => {
  const toast=useToast();
  const [announcements,setAnnouncements]=useState(MOCK_ANNOUNCEMENTS.map(a=>({...a})));
  const [showCreate,setShowCreate]=useState(false);const [detail,setDetail]=useState(null);
  const [form,setForm]=useState({title:'',category:'공지',content:'',startDate:'2026-02-11',endDate:'2026-03-11'});
  return (
    <PageShell breadcrumb={['관리자 전용','공지사항']} title="공지사항 관리" action={<button onClick={()=>setShowCreate(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center"><Plus size={16} className="mr-1.5"/>공지 등록</button>}>
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <table className="w-full text-sm"><thead className="bg-gray-50/80"><tr>
          <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500">제목</th>
          <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500">분류</th>
          <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500">게시 기간</th>
          <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500">작성자</th>
          <th className="px-5 py-3.5 text-right text-xs font-medium text-gray-500">조회수</th>
          <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500">상태</th>
          <th className="px-5 py-3.5 text-center text-xs font-medium text-gray-500">게시</th>
        </tr></thead><tbody className="divide-y divide-gray-100">{announcements.map(a=>(
          <tr key={a.id} className="hover:bg-gray-50/50 cursor-pointer" onClick={()=>setDetail(a)}>
            <td className="px-5 py-3.5 font-medium">{a.title}</td>
            <td className="px-5 py-3.5"><span className={`px-2 py-0.5 rounded-md text-xs font-medium ${a.category==='공지'?'bg-blue-50 text-blue-700':a.category==='점검'?'bg-orange-50 text-orange-700':'bg-green-50 text-green-700'}`}>{a.category}</span></td>
            <td className="px-5 py-3.5 text-gray-400 text-xs">{a.startDate} ~ {a.endDate}</td>
            <td className="px-5 py-3.5 text-gray-500">{a.author}</td>
            <td className="px-5 py-3.5 text-right font-medium">{a.views}</td>
            <td className="px-5 py-3.5"><StatusBadge status={a.status}/></td>
            <td className="px-5 py-3.5 text-center" onClick={e=>e.stopPropagation()}>
              <ToggleSwitch on={a.status==='게시 중'} onClick={()=>{setAnnouncements(p=>p.map(x=>x.id===a.id?{...x,status:x.status==='게시 중'?'중지':'게시 중'}:x));toast(a.status==='게시 중'?'공지가 중지되었습니다':'공지가 게시되었습니다',a.status==='게시 중'?'info':'success');}}/>
            </td>
          </tr>
        ))}</tbody></table>
      </div>
      <Modal isOpen={showCreate} onClose={()=>setShowCreate(false)} title="공지 등록" size="lg">
        <div className="space-y-4">
          <div><label className="block text-sm font-medium mb-1">제목</label><input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm"/></div>
          <div className="grid grid-cols-3 gap-4">
            <div><label className="block text-sm font-medium mb-1">분류</label><select value={form.category} onChange={e=>setForm({...form,category:e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm"><option>공지</option><option>점검</option><option>업데이트</option></select></div>
            <div><label className="block text-sm font-medium mb-1">시작일</label><input type="date" value={form.startDate} onChange={e=>setForm({...form,startDate:e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm"/></div>
            <div><label className="block text-sm font-medium mb-1">종료일</label><input type="date" value={form.endDate} onChange={e=>setForm({...form,endDate:e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm"/></div>
          </div>
          <div><label className="block text-sm font-medium mb-1">내용</label><textarea value={form.content} onChange={e=>setForm({...form,content:e.target.value})} rows={5} placeholder="공지 내용을 입력하세요..." className="w-full border rounded-lg px-3 py-2 text-sm"/></div>
          <button onClick={()=>{if(!form.title)return;setAnnouncements(p=>[{id:p.length+1,title:form.title,category:form.category,startDate:form.startDate,endDate:form.endDate,author:'김영빈',views:0,status:'게시 중',content:form.content},...p]);setShowCreate(false);setForm({title:'',category:'공지',content:'',startDate:'2026-02-11',endDate:'2026-03-11'});toast('공지가 등록되었습니다');}} className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium text-sm">등록</button>
        </div>
      </Modal>
      <Modal isOpen={!!detail} onClose={()=>setDetail(null)} title={detail?.title} size="lg">
        {detail&&<div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">{[['분류',detail.category],['작성자',detail.author],['조회수',detail.views],['게시 기간',`${detail.startDate} ~ ${detail.endDate}`],['상태',detail.status]].map(([k,v],i)=>(
            <div key={i} className={`bg-gray-50 p-3 rounded-lg ${i===3?'col-span-2':''}`}><div className="text-xs text-gray-400">{k}</div><div className="font-medium">{v}</div></div>
          ))}</div>
          {detail.content&&<div className="bg-gray-50 p-4 rounded-lg text-sm">{detail.content}</div>}
          <div className="flex space-x-2">
            <button onClick={()=>{setAnnouncements(p=>p.filter(x=>x.id!==detail.id));setDetail(null);toast('공지가 삭제되었습니다','info');}} className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg text-sm font-medium hover:bg-red-100">삭제</button>
          </div>
        </div>}
      </Modal>
    </PageShell>
  );
};

const SystemMonitorPage = () => (
  <PageShell breadcrumb={['관리자 전용','시스템 모니터링']} title="연동 SW 및 시스템 모니터링">
    <div className="grid grid-cols-3 gap-4 mb-6">
      {[{l:'연동 SW',v:MOCK_LINKED_SW.length,u:'개',c:'border-blue-500 bg-blue-50',tc:'text-blue-700'},
        {l:'정상 가동',v:MOCK_LINKED_SW.filter(s=>s.status==='Running').length,u:'개',c:'border-green-500 bg-green-50',tc:'text-green-700'},
        {l:'주의 필요',v:MOCK_LINKED_SW.filter(s=>s.status==='Warning').length,u:'개',c:'border-orange-500 bg-orange-50',tc:'text-orange-700'}
      ].map((c,i)=>(
        <div key={i} className={`p-5 rounded-xl border-l-4 bg-white shadow-sm ${c.c}`}>
          <div className="text-xs text-gray-500 mb-1">{c.l}</div>
          <div className={`text-2xl font-bold ${c.tc}`}>{c.v}<span className="text-sm font-normal text-gray-400 ml-1">{c.u}</span></div>
        </div>
      ))}
    </div>
    <div className="space-y-3">{MOCK_LINKED_SW.map((sw,i)=>(
      <div key={i} className="bg-white p-5 rounded-xl border shadow-sm hover:shadow-md transition-all">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${sw.status==='Running'?'bg-green-50':'bg-orange-50'}`}>
              <Link2 size={20} className={sw.status==='Running'?'text-green-600':'text-orange-500'}/>
            </div>
            <div>
              <div className="flex items-center space-x-2"><h3 className="font-bold text-sm">{sw.name}</h3><StatusBadge status={sw.status}/></div>
              <div className="flex items-center space-x-3 text-xs text-gray-400 mt-0.5">
                <span>v{sw.version}</span>
                <span className="font-mono">{sw.endpoint}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <div className="text-center"><div className="font-bold text-gray-800">{sw.cpu}%</div><div className="text-xs text-gray-400">CPU</div></div>
            <div className="text-center"><div className="font-bold text-gray-800">{sw.memory}%</div><div className="text-xs text-gray-400">Memory</div></div>
            <div className="text-center"><div className="font-bold text-gray-800">{sw.uptime}</div><div className="text-xs text-gray-400">Uptime</div></div>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t grid grid-cols-2 gap-2">
          <div><div className="flex justify-between text-xs mb-1"><span className="text-gray-500">CPU</span><span className="font-medium">{sw.cpu}%</span></div>
            <div className="w-full bg-gray-100 rounded-full h-1.5"><div className={`h-1.5 rounded-full ${sw.cpu>40?'bg-orange-500':'bg-green-500'}`} style={{width:`${sw.cpu}%`}}/></div></div>
          <div><div className="flex justify-between text-xs mb-1"><span className="text-gray-500">Memory</span><span className="font-medium">{sw.memory}%</span></div>
            <div className="w-full bg-gray-100 rounded-full h-1.5"><div className={`h-1.5 rounded-full ${sw.memory>50?'bg-orange-500':'bg-green-500'}`} style={{width:`${sw.memory}%`}}/></div></div>
        </div>
      </div>
    ))}</div>
  </PageShell>
);

const SecuritySettingsPage = () => {
  const toast=useToast();
  const [policy,setPolicy]=useState(MOCK_SECURITY_POLICY);
  const [newIp,setNewIp]=useState('');
  const addIp=()=>{if(!newIp)return;setPolicy(p=>({...p,allowedIps:[...p.allowedIps,newIp]}));setNewIp('');toast('IP/대역이 추가되었습니다');};
  const removeIp=ip=>setPolicy(p=>({...p,allowedIps:p.allowedIps.filter(x=>x!==ip)}));
  return (
    <PageShell breadcrumb={['관리자 전용','보안 설정']} title="보안 정책 및 접근 제어" action={<button onClick={()=>toast('보안 정책이 저장되었습니다')} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center"><Save size={16} className="mr-1.5"/>정책 저장</button>}>
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          {l:'2단계 인증',v:policy.twoFactorEnabled?'활성':'비활성',ok:policy.twoFactorEnabled,icon:Shield},
          {l:'IP 화이트리스트',v:policy.ipWhitelistEnabled?'활성':'비활성',ok:policy.ipWhitelistEnabled,icon:Globe},
          {l:'문서 DRM',v:policy.drmEnabled?'활성':'비활성',ok:policy.drmEnabled,icon:Lock},
          {l:'PII 마스킹',v:policy.piiMaskingEnabled?'활성':'비활성',ok:policy.piiMaskingEnabled,icon:Eye},
        ].map((s,i)=>(
          <div key={i} className={`p-4 rounded-xl border-l-4 bg-white shadow-sm ${s.ok?'border-green-500':'border-gray-300'}`}>
            <div className="flex items-center justify-between mb-2"><span className="text-xs text-gray-500 font-medium">{s.l}</span><div className={`w-7 h-7 rounded-lg ${s.ok?'bg-green-50 text-green-600':'bg-gray-100 text-gray-400'} flex items-center justify-center`}><s.icon size={14}/></div></div>
            <div className={`text-xl font-bold ${s.ok?'text-green-700':'text-gray-400'}`}>{s.v}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-5 mb-6">
        <div className="bg-white rounded-xl border shadow-sm p-5">
          <h3 className="font-bold text-sm mb-4 flex items-center"><KeyRound size={14} className="mr-1.5 text-gray-500"/>인증 정책</h3>
          <div className="space-y-4">
            <div><label className="text-xs text-gray-500">최소 비밀번호 길이</label>
              <div className="flex items-center space-x-2 mt-1">
                <input type="range" min="6" max="20" value={policy.passwordMinLen} onChange={e=>setPolicy({...policy,passwordMinLen:+e.target.value})} className="flex-1"/>
                <span className="text-sm font-bold text-blue-600 w-12 text-right">{policy.passwordMinLen}자</span>
              </div>
            </div>
            <div><label className="text-xs text-gray-500">비밀번호 만료 주기 (일)</label>
              <input type="number" value={policy.passwordExpireDays} onChange={e=>setPolicy({...policy,passwordExpireDays:+e.target.value})} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"/>
            </div>
            <div><label className="text-xs text-gray-500">세션 타임아웃 (분)</label>
              <input type="number" value={policy.sessionTimeoutMin} onChange={e=>setPolicy({...policy,sessionTimeoutMin:+e.target.value})} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"/>
            </div>
            <div><label className="text-xs text-gray-500">최대 로그인 실패 횟수</label>
              <input type="number" value={policy.maxLoginFail} onChange={e=>setPolicy({...policy,maxLoginFail:+e.target.value})} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"/>
            </div>
            <div className="flex items-center justify-between pt-2 border-t">
              <div><div className="text-sm font-medium">2단계 인증 강제</div><div className="text-[11px] text-gray-400">관리자 계정에는 필수 적용</div></div>
              <ToggleSwitch on={policy.twoFactorEnabled} onClick={()=>setPolicy(p=>({...p,twoFactorEnabled:!p.twoFactorEnabled}))}/>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border shadow-sm p-5">
          <h3 className="font-bold text-sm mb-4 flex items-center"><Lock size={14} className="mr-1.5 text-gray-500"/>데이터 보호</h3>
          <div className="space-y-3">
            {[
              ['drmEnabled','문서 DRM','다운로드 문서 워터마크 및 권한 통제'],
              ['piiMaskingEnabled','개인정보 자동 마스킹','이름, 주민번호, 연락처 응답 마스킹'],
              ['ipWhitelistEnabled','IP 화이트리스트','지정 IP/대역만 접근 허용'],
            ].map(([k,l,d])=>(
              <div key={k} className="flex items-center justify-between py-2 border-b last:border-b-0">
                <div><div className="text-sm font-medium">{l}</div><div className="text-[11px] text-gray-400">{d}</div></div>
                <ToggleSwitch on={policy[k]} onClick={()=>setPolicy(p=>({...p,[k]:!p[k]}))}/>
              </div>
            ))}
            <div className="pt-2"><label className="text-xs text-gray-500">감사 로그 보존 기간 (일)</label>
              <div className="flex items-center space-x-2 mt-1">
                <input type="range" min="30" max="2555" value={policy.auditRetentionDays} onChange={e=>setPolicy({...policy,auditRetentionDays:+e.target.value})} className="flex-1"/>
                <span className="text-sm font-bold text-blue-600 w-20 text-right">{policy.auditRetentionDays}일</span>
              </div>
              <p className="text-[11px] text-gray-400 mt-1">권장: 730일 (2년) - 정보보호 컴플라이언스 기준</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 mb-6">
        <div className="bg-white rounded-xl border shadow-sm p-5">
          <h3 className="font-bold text-sm mb-3 flex items-center"><Globe size={14} className="mr-1.5 text-gray-500"/>허용 IP/대역</h3>
          <div className="space-y-2 mb-3 max-h-48 overflow-y-auto">
            {policy.allowedIps.map((ip,i)=>(
              <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                <code className="text-sm font-mono">{ip}</code>
                <button onClick={()=>removeIp(ip)} className="text-red-500 hover:bg-red-100 p-1 rounded"><Trash2 size={12}/></button>
              </div>
            ))}
          </div>
          <div className="flex space-x-2">
            <input value={newIp} onChange={e=>setNewIp(e.target.value)} placeholder="10.20.30.0/24 또는 192.168.1.5" className="flex-1 px-3 py-2 border rounded-lg text-sm font-mono"/>
            <button onClick={addIp} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">추가</button>
          </div>
        </div>

        <div className="bg-white rounded-xl border shadow-sm p-5">
          <h3 className="font-bold text-sm mb-3 flex items-center"><AlertTriangle size={14} className="mr-1.5 text-gray-500"/>차단 파일 확장자</h3>
          <p className="text-xs text-gray-500 mb-3">업로드 및 다운로드 시 차단되는 파일 형식입니다.</p>
          <div className="flex flex-wrap gap-2">
            {policy.blockedFileTypes.map((t,i)=>(
              <span key={i} className="inline-flex items-center bg-red-50 text-red-700 border border-red-200 px-3 py-1 rounded-full text-xs font-mono">
                {t}<button onClick={()=>setPolicy(p=>({...p,blockedFileTypes:p.blockedFileTypes.filter(x=>x!==t)}))} className="ml-1.5 hover:text-red-900"><X size={10}/></button>
              </span>
            ))}
            <button className="px-3 py-1 border border-dashed rounded-full text-xs text-gray-500 hover:bg-gray-50">+ 추가</button>
          </div>
          <div className="mt-4 pt-3 border-t">
            <div className="text-xs text-gray-500 mb-2">현재 가드레일 룰 적용 현황</div>
            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <div className="bg-red-50 rounded-lg p-2"><div className="font-bold text-red-700">{MOCK_GUARDRAIL_LOGS.filter(l=>l.action==='차단').length}건</div><div className="text-red-500">차단</div></div>
              <div className="bg-yellow-50 rounded-lg p-2"><div className="font-bold text-yellow-700">{MOCK_GUARDRAIL_LOGS.filter(l=>l.action==='경고').length}건</div><div className="text-yellow-600">경고</div></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-sm flex items-center"><Shield size={14} className="mr-1.5 text-red-500"/>최근 보안 이벤트</h3>
          <button onClick={()=>toast('전체 보안 로그로 이동 (데모)','info')} className="text-xs text-blue-600 hover:underline">전체 로그 보기</button>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50/80 text-[11px] text-gray-500"><tr>
            <th className="px-4 py-2.5 text-left font-medium">시간</th>
            <th className="px-4 py-2.5 text-left font-medium">사용자</th>
            <th className="px-4 py-2.5 text-left font-medium">질의/요청</th>
            <th className="px-4 py-2.5 text-left font-medium">탐지 룰</th>
            <th className="px-4 py-2.5 text-left font-medium">처리</th>
          </tr></thead>
          <tbody className="divide-y">
            {MOCK_GUARDRAIL_LOGS.map(l=>(
              <tr key={l.id} className="hover:bg-gray-50/50">
                <td className="px-4 py-2.5 font-mono text-xs text-gray-400">{l.time}</td>
                <td className="px-4 py-2.5 font-medium">{l.user}</td>
                <td className="px-4 py-2.5 text-xs text-gray-500 truncate max-w-xs">{l.query}</td>
                <td className="px-4 py-2.5"><span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded text-xs font-medium">{l.rule}</span></td>
                <td className="px-4 py-2.5"><StatusBadge status={l.action}/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageShell>
  );
};

const SystemSettingsPage = () => {
  const toast=useToast();
  const [cfg,setCfg]=useState({
    serviceName:'GenOS - 한국가스기술공사',org:'한국가스기술공사 (KOGAS-Tech)',
    domain:'genos.kogas-tech.co.kr',adminEmail:'admin@kogas.or.kr',
    timezone:'Asia/Seoul',locale:'ko-KR',
    sso:true,ldap:true,oauthGoogle:false,oauthMs:true,
    defaultLlm:'GPT-OSS-120B',defaultEmb:'multilingual-e5-large',
    maxUpload:100,retentionDays:90,
    backupDaily:true,backupTimeWin:'02:00',backupRetention:30,
    smtp:'smtp.kogas.or.kr',smtpPort:587,
    slack:true,slackWebhook:'https://hooks.slack.com/services/****',
    license:{name:'KOGAS Enterprise',seats:500,expires:'2027-02-28',used:148},
  });
  const updates=[
    {ver:'1.4.2',date:'2026-02-13',type:'patch',desc:'A2A 프로토콜 안정성 개선, 가드레일 룰 엔진 v2 적용',installed:true},
    {ver:'1.4.1',date:'2026-01-28',type:'patch',desc:'OCR 한글 인식 정확도 향상',installed:true},
    {ver:'1.4.0',date:'2026-01-10',type:'minor',desc:'Actionable AI 모듈 추가, MCP 1.2 지원',installed:true},
    {ver:'1.5.0-beta',date:'2026-02-14',type:'major',desc:'HITL 통합 워크플로우 (베타)',installed:false},
  ];
  return (
    <PageShell breadcrumb={['관리자 전용','시스템 설정']} title="시스템 전역 설정" action={<button onClick={()=>toast('설정이 저장되었습니다')} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center"><Save size={16} className="mr-1.5"/>설정 저장</button>}>
      <div className="grid grid-cols-2 gap-5 mb-6">
        <div className="bg-white rounded-xl border shadow-sm p-5">
          <h3 className="font-bold text-sm mb-4 flex items-center"><Briefcase size={14} className="mr-1.5 text-gray-500"/>일반</h3>
          <div className="space-y-3">
            <div><label className="text-xs text-gray-500">서비스 이름</label><input value={cfg.serviceName} onChange={e=>setCfg({...cfg,serviceName:e.target.value})} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"/></div>
            <div><label className="text-xs text-gray-500">조직명</label><input value={cfg.org} onChange={e=>setCfg({...cfg,org:e.target.value})} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"/></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="text-xs text-gray-500">서비스 도메인</label><input value={cfg.domain} onChange={e=>setCfg({...cfg,domain:e.target.value})} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"/></div>
              <div><label className="text-xs text-gray-500">관리자 이메일</label><input value={cfg.adminEmail} onChange={e=>setCfg({...cfg,adminEmail:e.target.value})} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"/></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="text-xs text-gray-500">타임존</label>
                <select value={cfg.timezone} onChange={e=>setCfg({...cfg,timezone:e.target.value})} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm bg-white">
                  <option>Asia/Seoul</option><option>UTC</option><option>Asia/Tokyo</option>
                </select>
              </div>
              <div><label className="text-xs text-gray-500">언어/지역</label>
                <select value={cfg.locale} onChange={e=>setCfg({...cfg,locale:e.target.value})} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm bg-white">
                  <option>ko-KR</option><option>en-US</option><option>ja-JP</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border shadow-sm p-5">
          <h3 className="font-bold text-sm mb-4 flex items-center"><Cpu size={14} className="mr-1.5 text-gray-500"/>기본 모델 및 제한</h3>
          <div className="space-y-3">
            <div><label className="text-xs text-gray-500">기본 LLM</label>
              <select value={cfg.defaultLlm} onChange={e=>setCfg({...cfg,defaultLlm:e.target.value})} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm bg-white">
                <option>GPT-OSS-120B</option><option>Llama-3-Kor-Instruct</option><option>EXAONE-3.0-7.8B</option>
              </select>
            </div>
            <div><label className="text-xs text-gray-500">기본 임베딩 모델</label>
              <select value={cfg.defaultEmb} onChange={e=>setCfg({...cfg,defaultEmb:e.target.value})} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm bg-white">
                <option>multilingual-e5-large</option><option>ko-sbert-multitask</option><option>BGE-M3</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="text-xs text-gray-500">파일 업로드 최대 (MB)</label><input type="number" value={cfg.maxUpload} onChange={e=>setCfg({...cfg,maxUpload:+e.target.value})} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"/></div>
              <div><label className="text-xs text-gray-500">대화 기록 보관 (일)</label><input type="number" value={cfg.retentionDays} onChange={e=>setCfg({...cfg,retentionDays:+e.target.value})} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"/></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border shadow-sm p-5">
          <h3 className="font-bold text-sm mb-4 flex items-center"><Link2 size={14} className="mr-1.5 text-gray-500"/>외부 인증 연동</h3>
          <div className="space-y-2.5">
            {[
              ['sso','사내 SSO (SAML 2.0)','한국가스기술공사 통합 인증'],
              ['ldap','LDAP / Active Directory','조직도 자동 동기화'],
              ['oauthMs','Microsoft 365','Outlook, Teams 연동'],
              ['oauthGoogle','Google Workspace','Gmail, Calendar 연동'],
            ].map(([k,l,d])=>(
              <div key={k} className="flex items-center justify-between py-2 border-b last:border-b-0">
                <div className="flex items-center space-x-2.5">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${cfg[k]?'bg-green-50 text-green-600':'bg-gray-100 text-gray-400'}`}><Link2 size={14}/></div>
                  <div><div className="text-sm font-medium">{l}</div><div className="text-[11px] text-gray-400">{d}</div></div>
                </div>
                <ToggleSwitch on={cfg[k]} onClick={()=>setCfg(p=>({...p,[k]:!p[k]}))}/>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border shadow-sm p-5">
          <h3 className="font-bold text-sm mb-4 flex items-center"><Megaphone size={14} className="mr-1.5 text-gray-500"/>알림 채널</h3>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div><label className="text-xs text-gray-500">SMTP 서버</label><input value={cfg.smtp} onChange={e=>setCfg({...cfg,smtp:e.target.value})} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm font-mono"/></div>
              <div><label className="text-xs text-gray-500">SMTP 포트</label><input type="number" value={cfg.smtpPort} onChange={e=>setCfg({...cfg,smtpPort:+e.target.value})} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"/></div>
            </div>
            <div className="pt-2 border-t">
              <div className="flex items-center justify-between mb-2">
                <div><div className="text-sm font-medium">Slack 알림</div><div className="text-[11px] text-gray-400">중요 이벤트 발생 시 즉시 푸시</div></div>
                <ToggleSwitch on={cfg.slack} onClick={()=>setCfg(p=>({...p,slack:!p.slack}))}/>
              </div>
              {cfg.slack&&<input value={cfg.slackWebhook} onChange={e=>setCfg({...cfg,slackWebhook:e.target.value})} placeholder="Webhook URL" className="w-full mt-1 px-3 py-2 border rounded-lg text-sm font-mono"/>}
            </div>
            <button onClick={()=>toast('테스트 알림이 발송되었습니다','info')} className="w-full py-2 border border-dashed rounded-lg text-xs text-gray-500 hover:border-blue-400 hover:text-blue-600">테스트 알림 발송</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5 mb-6">
        <div className="bg-white rounded-xl border shadow-sm p-5">
          <h3 className="font-bold text-sm mb-4 flex items-center"><HardDrive size={14} className="mr-1.5 text-gray-500"/>백업 및 복구</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between"><div><div className="text-sm font-medium">자동 일일 백업</div><div className="text-[11px] text-gray-400">매일 정해진 시간에 실행</div></div><ToggleSwitch on={cfg.backupDaily} onClick={()=>setCfg(p=>({...p,backupDaily:!p.backupDaily}))}/></div>
            <div><label className="text-xs text-gray-500">백업 시작 시각</label><input type="time" value={cfg.backupTimeWin} onChange={e=>setCfg({...cfg,backupTimeWin:e.target.value})} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"/></div>
            <div><label className="text-xs text-gray-500">백업 보관 기간 (일)</label><input type="number" value={cfg.backupRetention} onChange={e=>setCfg({...cfg,backupRetention:+e.target.value})} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"/></div>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button onClick={()=>toast('백업이 시작되었습니다','info')} className="py-2 bg-blue-600 text-white rounded-lg text-xs font-medium flex items-center justify-center"><Save size={12} className="mr-1"/>지금 백업</button>
              <button onClick={()=>toast('복구 마법사 (데모)','info')} className="py-2 border rounded-lg text-xs font-medium hover:bg-gray-50 flex items-center justify-center"><RotateCcw size={12} className="mr-1"/>복구</button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border shadow-sm p-5">
          <h3 className="font-bold text-sm mb-4 flex items-center"><Briefcase size={14} className="mr-1.5 text-gray-500"/>라이선스</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">라이선스</span><span className="font-medium">{cfg.license.name}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">사용 / 좌석 수</span><span className="font-medium">{cfg.license.used} / {cfg.license.seats}</span></div>
            <div className="w-full bg-gray-100 rounded-full h-1.5"><div className="bg-blue-500 h-1.5 rounded-full" style={{width:`${(cfg.license.used/cfg.license.seats)*100}%`}}/></div>
            <div className="flex justify-between"><span className="text-gray-500">만료일</span><span className="font-medium text-green-600">{cfg.license.expires}</span></div>
            <button onClick={()=>toast('라이선스 키가 클립보드에 복사되었습니다','info')} className="w-full mt-2 py-2 border rounded-lg text-xs font-medium hover:bg-gray-50 flex items-center justify-center"><Copy size={12} className="mr-1"/>라이선스 키 복사</button>
          </div>
        </div>

        <div className="bg-white rounded-xl border shadow-sm p-5">
          <h3 className="font-bold text-sm mb-4 flex items-center"><Package size={14} className="mr-1.5 text-gray-500"/>업데이트</h3>
          <div className="bg-blue-50 rounded-lg p-3 mb-3">
            <div className="text-xs text-blue-700 font-bold">현재 버전</div>
            <div className="text-lg font-bold text-blue-700 mt-0.5">v1.4.2</div>
            <div className="text-[11px] text-blue-500">2026-02-13 적용</div>
          </div>
          <button onClick={()=>toast('최신 버전을 확인 중입니다...','info')} className="w-full py-2 bg-blue-600 text-white rounded-lg text-xs font-medium flex items-center justify-center"><RefreshCw size={12} className="mr-1"/>업데이트 확인</button>
        </div>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="px-5 py-3 bg-gray-50/80 border-b"><h3 className="font-bold text-sm flex items-center"><History size={14} className="mr-1.5 text-gray-500"/>업데이트 이력</h3></div>
        <table className="w-full text-sm">
          <thead className="bg-white text-[11px] text-gray-400"><tr>
            <th className="px-5 py-2.5 text-left font-medium">버전</th>
            <th className="px-5 py-2.5 text-left font-medium">분류</th>
            <th className="px-5 py-2.5 text-left font-medium">출시일</th>
            <th className="px-5 py-2.5 text-left font-medium">변경 사항</th>
            <th className="px-5 py-2.5 text-center font-medium">상태</th>
          </tr></thead>
          <tbody className="divide-y">
            {updates.map((u,i)=>(
              <tr key={i} className="hover:bg-gray-50/50">
                <td className="px-5 py-2.5 font-mono font-bold">{u.ver}</td>
                <td className="px-5 py-2.5"><span className={`px-2 py-0.5 rounded text-xs font-medium ${u.type==='major'?'bg-purple-50 text-purple-700':u.type==='minor'?'bg-blue-50 text-blue-700':'bg-gray-100 text-gray-600'}`}>{u.type}</span></td>
                <td className="px-5 py-2.5 text-xs text-gray-400">{u.date}</td>
                <td className="px-5 py-2.5 text-xs text-gray-600">{u.desc}</td>
                <td className="px-5 py-2.5 text-center">{u.installed?<span className="bg-green-50 text-green-700 px-2 py-0.5 rounded text-xs font-medium inline-flex items-center"><Check size={10} className="mr-0.5"/>적용됨</span>:<button onClick={()=>toast('업그레이드 시작 (데모)','info')} className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs font-medium">설치</button>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageShell>
  );
};

const AdminPage = () => {
  const toast=useToast();
  const [alerts,setAlerts]=useState(MOCK_RECENT_ALERTS);
  const unackCount=alerts.filter(a=>!a.ack).length;
  const pendingReqs=MOCK_PERMISSION_REQUESTS.filter(p=>p.status==='대기 중').length;
  const totalQueries=MOCK_USAGE_STATS.daily.reduce((s,d)=>s+d.queries,0);
  const avgUsers=Math.round(MOCK_USAGE_STATS.daily.reduce((s,d)=>s+d.users,0)/MOCK_USAGE_STATS.daily.length);
  const healthyPct=Math.round((MOCK_LINKED_SW.filter(s=>s.status==='Running').length/MOCK_LINKED_SW.length)*100);
  const maxBar=Math.max(...MOCK_USAGE_STATS.daily.map(d=>d.queries));
  const sevColor=s=>s==='critical'?'border-red-500 bg-red-50 text-red-700':s==='warning'?'border-orange-500 bg-orange-50 text-orange-700':'border-blue-500 bg-blue-50 text-blue-700';
  const sevIcon=s=>s==='critical'?<AlertTriangle size={14}/>:s==='warning'?<AlertCircle size={14}/>:<CheckCircle size={14}/>;
  const ackAll=()=>{setAlerts(p=>p.map(a=>({...a,ack:true})));toast('모든 알림을 확인 처리했습니다');};
  const cards=[
    {label:'오늘 질의 수',v:'920',sub:'전일 대비 -48%',c:'border-blue-500',tc:'text-blue-700',icon:MessageSquare,bg:'bg-blue-50'},
    {label:'활성 사용자',v:'68',sub:`주간 평균 ${avgUsers}명`,c:'border-green-500',tc:'text-green-700',icon:Users,bg:'bg-green-50'},
    {label:'대기 권한 요청',v:pendingReqs,sub:'즉시 처리 필요',c:'border-orange-500',tc:'text-orange-700',icon:CheckSquare,bg:'bg-orange-50'},
    {label:'미확인 알림',v:unackCount,sub:`전체 ${alerts.length}건 중`,c:'border-red-500',tc:'text-red-700',icon:Bell,bg:'bg-red-50'},
    {label:'시스템 건강도',v:`${healthyPct}%`,sub:`${MOCK_LINKED_SW.length}개 연동 SW`,c:'border-indigo-500',tc:'text-indigo-700',icon:Activity,bg:'bg-indigo-50'},
    {label:'AI 품질 점수',v:'87%',sub:'평균 신뢰도',c:'border-purple-500',tc:'text-purple-700',icon:Star,bg:'bg-purple-50'},
  ];
  const quickShortcuts=[
    {icon:Users,t:'사용자 관리',d:'계정, 권한, 역할'},
    {icon:FolderTree,t:'지식영역 관리',d:'RAG 지식 DB'},
    {icon:TrendingUp,t:'이용 통계',d:'질의 현황 분석'},
    {icon:FileText,t:'접근 로그',d:'감사 로그 추적'},
    {icon:Star,t:'AI 품질 관리',d:'전문가 검토'},
    {icon:Megaphone,t:'공지사항',d:'공지, 점검 안내'},
    {icon:Link2,t:'시스템 모니터링',d:'연동 SW 상태'},
    {icon:Shield,t:'보안 설정',d:'접근 제어, DRM'},
    {icon:Settings,t:'시스템 설정',d:'전역 구성 관리'},
  ];
  return (
    <PageShell breadcrumb={['관리자 전용','관리']} title="관리자 대시보드" action={<div className="flex items-center space-x-2"><span className="text-xs text-gray-400">최종 업데이트 2분 전</span><button onClick={()=>toast('최신 데이터로 갱신되었습니다','info')} className="p-2 border rounded-lg hover:bg-gray-50"><RefreshCw size={14}/></button></div>}>
      {/* KPI cards */}
      <div className="grid grid-cols-6 gap-3 mb-6">
        {cards.map((c,i)=>(
          <div key={i} className={`p-4 rounded-xl border-l-4 bg-white shadow-sm ${c.c}`}>
            <div className="flex items-center justify-between mb-1.5"><span className="text-xs text-gray-500 font-medium">{c.label}</span><div className={`w-7 h-7 rounded-lg ${c.bg} flex items-center justify-center`}><c.icon size={14} className={c.tc}/></div></div>
            <div className={`text-2xl font-bold ${c.tc}`}>{c.v}</div>
            <div className="text-[11px] text-gray-400 mt-1">{c.sub}</div>
          </div>
        ))}
      </div>

      {/* Activity overview + Alerts */}
      <div className="grid grid-cols-3 gap-5 mb-6">
        <div className="col-span-2 bg-white rounded-xl border shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sm">최근 7일 이용 현황</h3>
            <div className="flex items-center space-x-2 text-xs">
              <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-sm bg-blue-500 mr-1.5"/>질의 수</span>
              <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-sm bg-green-400 mr-1.5"/>사용자 수</span>
            </div>
          </div>
          <div className="flex items-end space-x-3 h-44">
            {MOCK_USAGE_STATS.daily.map((d,i)=>(
              <div key={i} className="flex-1 flex flex-col items-center group">
                <div className="w-full flex items-end space-x-1 h-full">
                  <div className="flex-1 bg-blue-100 rounded-t-md relative group-hover:bg-blue-200 transition-colors" style={{height:`${(d.queries/maxBar)*100}%`}}>
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-gray-600 font-bold whitespace-nowrap">{d.queries}</div>
                  </div>
                  <div className="flex-1 bg-green-100 rounded-t-md group-hover:bg-green-200 transition-colors" style={{height:`${(d.users/128)*100}%`}}/>
                </div>
                <div className="text-[10px] text-gray-400 mt-1.5 font-medium">{d.date}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t grid grid-cols-3 gap-3 text-center">
            <div><div className="text-lg font-bold text-blue-700">{totalQueries.toLocaleString()}</div><div className="text-[11px] text-gray-400">총 질의</div></div>
            <div><div className="text-lg font-bold text-green-700">{avgUsers}</div><div className="text-[11px] text-gray-400">일평균 사용자</div></div>
            <div><div className="text-lg font-bold text-purple-700">1.1s</div><div className="text-[11px] text-gray-400">평균 응답시간</div></div>
          </div>
        </div>
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b flex items-center justify-between">
            <div className="flex items-center space-x-2"><Bell size={14} className="text-red-500"/><h3 className="font-bold text-sm">최근 알림</h3>{unackCount>0&&<span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">{unackCount}</span>}</div>
            <button onClick={ackAll} className="text-[11px] text-blue-600 hover:underline font-medium">모두 확인</button>
          </div>
          <div className="flex-1 overflow-y-auto max-h-72 divide-y">
            {alerts.map(a=>(
              <div key={a.id} className={`px-4 py-3 hover:bg-gray-50 ${!a.ack?'bg-yellow-50/30':''}`}>
                <div className="flex items-start space-x-2">
                  <span className={`mt-0.5 p-1 rounded ${sevColor(a.severity)}`}>{sevIcon(a.severity)}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-gray-800 truncate">{a.title}</div>
                    <div className="flex items-center justify-between mt-1"><span className="text-[10px] text-gray-400">{a.source}</span><span className="text-[10px] text-gray-400">{a.time}</span></div>
                  </div>
                  {!a.ack&&<button onClick={()=>setAlerts(p=>p.map(x=>x.id===a.id?{...x,ack:true}:x))} className="text-[10px] text-blue-600 hover:underline">확인</button>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pending requests + Top agents */}
      <div className="grid grid-cols-3 gap-5 mb-6">
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="px-5 py-3 bg-gray-50/80 border-b flex items-center justify-between">
            <h3 className="font-bold text-sm flex items-center"><CheckSquare size={14} className="mr-1.5 text-orange-500"/>대기 중인 권한 요청</h3>
            <span className="text-[10px] bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded font-bold">{pendingReqs}건</span>
          </div>
          <div className="divide-y">
            {MOCK_PERMISSION_REQUESTS.filter(p=>p.status==='대기 중').map(p=>(
              <div key={p.id} className="px-5 py-3 hover:bg-gray-50/50">
                <div className="flex items-center justify-between mb-1"><span className="text-sm font-medium">{p.user}</span><span className="text-[10px] text-gray-400">{p.date}</span></div>
                <div className="text-xs text-gray-500 mb-2">{p.dept} · {p.type}</div>
                <div className="text-xs bg-gray-50 rounded px-2 py-1 mb-2 truncate">{p.target}</div>
                <div className="flex space-x-1">
                  <button onClick={()=>toast('승인되었습니다')} className="flex-1 px-2 py-1 bg-blue-600 text-white rounded text-[11px] font-medium hover:bg-blue-700">승인</button>
                  <button onClick={()=>toast('거부되었습니다','warning')} className="flex-1 px-2 py-1 border border-red-200 text-red-600 rounded text-[11px] font-medium hover:bg-red-50">거부</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-2 bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="px-5 py-3 bg-gray-50/80 border-b flex items-center justify-between">
            <h3 className="font-bold text-sm flex items-center"><TrendingUp size={14} className="mr-1.5 text-blue-600"/>인기 에이전트 TOP 6 (24시간)</h3>
            <button className="text-[11px] text-gray-500 hover:text-gray-700 flex items-center">전체 보기<ChevronRight size={12}/></button>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-white text-[11px] text-gray-400"><tr>
              <th className="px-5 py-2 text-left font-medium">#</th>
              <th className="px-5 py-2 text-left font-medium">에이전트</th>
              <th className="px-5 py-2 text-left font-medium">담당 부서</th>
              <th className="px-5 py-2 text-right font-medium">호출 수</th>
              <th className="px-5 py-2 text-right font-medium">증감</th>
            </tr></thead>
            <tbody className="divide-y">
              {MOCK_TOP_AGENTS_RANK.map((a,i)=>(
                <tr key={i} className="hover:bg-gray-50/50">
                  <td className="px-5 py-2.5"><span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${i<3?'bg-blue-100 text-blue-700':'bg-gray-100 text-gray-500'}`}>{i+1}</span></td>
                  <td className="px-5 py-2.5"><div className="flex items-center space-x-2"><Bot size={14} className="text-gray-400"/><span className="font-medium">{a.name}</span></div></td>
                  <td className="px-5 py-2.5 text-xs text-gray-500">{a.dept}</td>
                  <td className="px-5 py-2.5 text-right font-bold">{a.calls.toLocaleString()}</td>
                  <td className={`px-5 py-2.5 text-right text-xs font-medium ${a.up?'text-green-600':'text-red-600'}`}>{a.trend}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick shortcuts */}
      <h3 className="font-bold text-sm mb-3 text-gray-700">바로 가기</h3>
      <div className="grid grid-cols-3 gap-3">
        {quickShortcuts.map((c,i)=>(
          <div key={i} className="bg-white p-4 rounded-xl border shadow-sm hover:shadow-md hover:border-blue-300 cursor-pointer transition-all flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-blue-600"><c.icon size={18}/></div>
              <div><h4 className="font-bold text-sm">{c.t}</h4><p className="text-[11px] text-gray-500">{c.d}</p></div>
            </div>
            <ChevronRight size={16} className="text-gray-300"/>
          </div>
        ))}
      </div>
    </PageShell>
  );
};

const UserPage = () => {
  const toast=useToast();
  const [profile,setProfile]=useState({name:'김영빈',dept:'AI활용 초혁신 추진반',role:'시스템관리자',email:'kim@kogas.or.kr',phone:'02-2100-0000',position:'책임',employee:'2018-0042'});
  const [showEdit,setShowEdit]=useState(false);const [editForm,setEditForm]=useState({...profile});
  const [tab,setTab]=useState('overview');
  const [notifs,setNotifs]=useState(MOCK_NOTIFICATIONS_USER);
  const [favs,setFavs]=useState(MOCK_FAVORITE_AGENTS);
  const [apiKeys,setApiKeys]=useState(MOCK_API_KEYS);
  const [showKey,setShowKey]=useState({});
  const [prefs,setPrefs]=useState({defaultModel:'GPT-OSS-120B',language:'ko',theme:'light',emailNotif:true,slackNotif:false,showSources:true,saveHistory:true});
  const [showNewKa,setShowNewKa]=useState(false);
  const [newKaName,setNewKaName]=useState('');
  const [personalKas,setPersonalKas]=useState(MOCK_PERSONAL_KA);
  const [showCreateKey,setShowCreateKey]=useState(false);
  const [newKeyName,setNewKeyName]=useState('');
  const [newKeyScope,setNewKeyScope]=useState('에이전트 호출');
  const unread=notifs.filter(n=>!n.read).length;
  const maxDaily=Math.max(...MOCK_USER_USAGE_DAILY.map(d=>d.q));
  const totalQ=MOCK_USER_USAGE_DAILY.reduce((s,d)=>s+d.q,0);
  const quotaUsed=856,quotaLimit=2000,quotaPct=Math.round((quotaUsed/quotaLimit)*100);
  const stats=[
    {l:'총 질의 수',v:'1,247',sub:'전월 대비 +12%',c:'border-blue-500',tc:'text-blue-700',icon:MessageSquare,bg:'bg-blue-50'},
    {l:'이번 달 사용량',v:'342',sub:'일 평균 17건',c:'border-green-500',tc:'text-green-700',icon:Activity,bg:'bg-green-50'},
    {l:'개인 지식 문서',v:personalKas.reduce((s,k)=>s+k.docs,0),sub:`${personalKas.length}개 지식영역`,c:'border-purple-500',tc:'text-purple-700',icon:FolderTree,bg:'bg-purple-50'},
    {l:'API 호출',v:quotaUsed.toLocaleString(),sub:`한도 ${quotaLimit.toLocaleString()}회`,c:'border-orange-500',tc:'text-orange-700',icon:KeyRound,bg:'bg-orange-50'},
  ];
  const notifIcon=t=>t==='approval'?<CheckCircle size={14} className="text-green-600"/>:t==='announce'?<Megaphone size={14} className="text-blue-600"/>:t==='feedback'?<Star size={14} className="text-purple-600"/>:t==='system'?<Settings size={14} className="text-gray-600"/>:<Bot size={14} className="text-orange-600"/>;
  const togglePin=id=>setFavs(p=>p.map(a=>a.id===id?{...a,pinned:!a.pinned}:a));
  const markRead=id=>setNotifs(p=>p.map(n=>n.id===id?{...n,read:true}:n));
  const markAllRead=()=>{setNotifs(p=>p.map(n=>({...n,read:true})));toast('모든 알림을 읽음 처리했습니다');};
  const revokeKey=id=>{setApiKeys(p=>p.filter(k=>k.id!==id));toast('API 키가 삭제되었습니다','warning');};
  const createKey=()=>{
    if(!newKeyName){toast('이름을 입력하세요','warning');return;}
    const rnd=Math.random().toString(36).slice(2,6);
    setApiKeys(p=>[...p,{id:Date.now(),name:newKeyName,key:`genos-api-new-${rnd}-${Math.random().toString(36).slice(2,6)}`,scope:newKeyScope,created:'2026-02-14',lastUsed:'-',calls:0,status:'활성',expires:'2027-02-14'}]);
    setShowCreateKey(false);setNewKeyName('');toast('API 키가 발급되었습니다');
  };
  const createKa=()=>{
    if(!newKaName){toast('이름을 입력하세요','warning');return;}
    setPersonalKas(p=>[...p,{id:`PKA-${Date.now()}`,name:newKaName,docs:0,chunks:0,size:'0 MB',updated:'2026-02-14',status:'Healthy',shared:false}]);
    setShowNewKa(false);setNewKaName('');toast('개인 지식영역이 생성되었습니다');
  };
  return (
    <PageShell breadcrumb={['사용자 페이지']} title="마이페이지" action={
      <div className="flex items-center space-x-2">
        <button className="relative p-2 border rounded-lg hover:bg-gray-50">
          <Bell size={16}/>{unread>0&&<span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{unread}</span>}
        </button>
        <button onClick={()=>{setEditForm({...profile});setShowEdit(true);}} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center"><UserCog size={16} className="mr-1.5"/>프로필 수정</button>
      </div>
    }>
      {/* Top profile banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-6 mb-6 text-white shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-5">
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur ring-4 ring-white/30 flex items-center justify-center text-3xl font-bold">{profile.name[0]}</div>
            <div>
              <div className="text-2xl font-bold">{profile.name} <span className="text-base font-normal opacity-80">· {profile.position}</span></div>
              <div className="opacity-90 mt-1 text-sm">{profile.dept} · {profile.role}</div>
              <div className="opacity-70 mt-1 text-xs flex items-center space-x-3"><span>{profile.email}</span><span>·</span><span>사번 {profile.employee}</span></div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs opacity-80 mb-1">이번 달 API 사용량</div>
            <div className="flex items-end space-x-2 mb-2"><div className="text-3xl font-bold">{quotaUsed}</div><div className="text-sm opacity-80 pb-1">/ {quotaLimit}</div></div>
            <div className="w-40 bg-white/20 rounded-full h-1.5"><div className={`h-1.5 rounded-full ${quotaPct>80?'bg-red-300':'bg-white'}`} style={{width:`${quotaPct}%`}}/></div>
            <div className="text-xs opacity-80 mt-1">{quotaPct}% 사용</div>
          </div>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {stats.map((s,i)=>(
          <div key={i} className={`p-4 rounded-xl border-l-4 bg-white shadow-sm ${s.c}`}>
            <div className="flex items-center justify-between mb-2"><span className="text-xs text-gray-500 font-medium">{s.l}</span><div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center`}><s.icon size={14} className={s.tc}/></div></div>
            <div className={`text-2xl font-bold ${s.tc}`}>{s.v}</div>
            <div className="text-[11px] text-gray-400 mt-1">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Tab bar */}
      <div className="flex space-x-1 mb-5 border-b">
        {[['overview','개요'],['knowledge','개인 지식영역'],['history','이용 기록'],['api','API 키'],['notif',`알림 ${unread>0?`(${unread})`:''}`],['prefs','환경 설정']].map(([k,l])=>(
          <button key={k} onClick={()=>setTab(k)} className={`px-5 py-2.5 text-sm font-medium border-b-2 transition-colors ${tab===k?'border-blue-600 text-blue-600':'border-transparent text-gray-500 hover:text-gray-800'}`}>{l}</button>
        ))}
      </div>

      {/* === OVERVIEW TAB === */}
      {tab==='overview'&&<>
        <div className="grid grid-cols-3 gap-5 mb-6">
          <div className="col-span-2 bg-white rounded-xl border shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-sm">최근 7일 내 사용량</h3>
              <span className="text-xs text-gray-400">총 {totalQ}건</span>
            </div>
            <div className="flex items-end space-x-2 h-40">
              {MOCK_USER_USAGE_DAILY.map((d,i)=>(
                <div key={i} className="flex-1 flex flex-col items-center group">
                  <div className="w-full bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-md relative group-hover:from-blue-600 group-hover:to-blue-400 transition-all" style={{height:`${(d.q/maxDaily)*100}%`,minHeight:'4px'}}>
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-gray-600 font-bold whitespace-nowrap opacity-0 group-hover:opacity-100">{d.q}</div>
                  </div>
                  <div className="text-[10px] text-gray-400 mt-1.5 font-medium">{d.date}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b flex items-center justify-between">
              <h3 className="font-bold text-sm flex items-center"><Star size={14} className="mr-1.5 text-yellow-500 fill-yellow-400"/>즐겨찾는 에이전트</h3>
              <span className="text-[10px] text-gray-400">{favs.filter(f=>f.pinned).length}개</span>
            </div>
            <div className="divide-y max-h-64 overflow-y-auto">
              {favs.map(a=>(
                <div key={a.id} className="px-4 py-3 hover:bg-gray-50 flex items-center justify-between">
                  <div className="flex items-center space-x-2 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0"><Bot size={14} className="text-blue-600"/></div>
                    <div className="min-w-0">
                      <div className="text-xs font-medium truncate">{a.name}</div>
                      <div className="text-[10px] text-gray-400">{a.calls}회 · {a.lastUsed}</div>
                    </div>
                  </div>
                  <button onClick={()=>togglePin(a.id)} className="text-yellow-500 hover:scale-110 transition-transform"><Star size={14} className={a.pinned?'fill-yellow-400':''}/></button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b flex items-center justify-between">
              <h3 className="font-bold text-sm flex items-center"><MessageSquare size={14} className="mr-1.5 text-blue-600"/>최근 대화</h3>
              <button className="text-[11px] text-blue-600 hover:underline">전체 보기</button>
            </div>
            <div className="divide-y">
              {MOCK_RECENT_CHATS.slice(0,5).map(c=>(
                <div key={c.id} className="px-5 py-3 hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-1.5 min-w-0">
                      {c.starred&&<Star size={12} className="text-yellow-500 fill-yellow-400 shrink-0"/>}
                      <span className="text-sm font-medium truncate">{c.title}</span>
                    </div>
                    <span className="text-[10px] text-gray-400 ml-2 shrink-0">{c.time}</span>
                  </div>
                  <div className="text-xs text-gray-500 truncate">{c.agent} · {c.msgs}개 메시지</div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b flex items-center justify-between">
              <h3 className="font-bold text-sm flex items-center"><Bell size={14} className="mr-1.5 text-red-500"/>새 알림</h3>
              <button onClick={markAllRead} className="text-[11px] text-blue-600 hover:underline">모두 읽음</button>
            </div>
            <div className="divide-y max-h-72 overflow-y-auto">
              {notifs.slice(0,5).map(n=>(
                <div key={n.id} onClick={()=>markRead(n.id)} className={`px-5 py-3 cursor-pointer hover:bg-gray-50 ${!n.read?'bg-blue-50/30':''}`}>
                  <div className="flex items-start space-x-2">
                    <div className="mt-0.5">{notifIcon(n.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between"><span className="text-xs font-medium">{n.title}</span>{!n.read&&<span className="w-1.5 h-1.5 bg-blue-600 rounded-full"/>}</div>
                      <div className="text-[11px] text-gray-500 mt-0.5 truncate">{n.desc}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">{n.time}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>}

      {/* === KNOWLEDGE TAB === */}
      {tab==='knowledge'&&<>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">개인 지식영역에 업로드한 문서는 본인만 검색에 활용할 수 있습니다.</p>
          <button onClick={()=>setShowNewKa(true)} className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center"><Plus size={14} className="mr-1"/>지식영역 생성</button>
        </div>
        <div className="space-y-3 mb-6">
          {personalKas.map(ka=>(
            <div key={ka.id} className="bg-white p-5 rounded-xl border shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center"><FolderTree size={20} className="text-purple-600"/></div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-bold text-sm">{ka.name}</h3>
                      <StatusBadge status={ka.status}/>
                      {ka.shared&&<span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[10px] font-medium">팀 공유</span>}
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">최종 업데이트 {ka.updated}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-center"><div className="font-bold">{ka.docs}</div><div className="text-[10px] text-gray-400">문서</div></div>
                  <div className="text-center"><div className="font-bold">{ka.chunks.toLocaleString()}</div><div className="text-[10px] text-gray-400">청크</div></div>
                  <div className="text-center"><div className="font-bold">{ka.size}</div><div className="text-[10px] text-gray-400">용량</div></div>
                  <button onClick={()=>toast('문서 업로드 (데모)')} className="px-3 py-1.5 border rounded-lg text-xs font-medium hover:bg-gray-50 flex items-center"><UploadCloud size={12} className="mr-1"/>업로드</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="px-5 py-3 bg-gray-50/80 border-b"><h3 className="font-bold text-sm">최근 업로드 문서</h3></div>
          <table className="w-full text-sm">
            <thead className="bg-white text-[11px] text-gray-400"><tr>
              <th className="px-5 py-2.5 text-left font-medium">파일명</th>
              <th className="px-5 py-2.5 text-left font-medium">크기</th>
              <th className="px-5 py-2.5 text-left font-medium">페이지</th>
              <th className="px-5 py-2.5 text-left font-medium">청크</th>
              <th className="px-5 py-2.5 text-left font-medium">업로드일</th>
              <th className="px-5 py-2.5 text-left font-medium">상태</th>
            </tr></thead>
            <tbody className="divide-y">
              {MOCK_KA_DOCS.map((d,i)=>(
                <tr key={i} className="hover:bg-gray-50/50">
                  <td className="px-5 py-2.5"><div className="flex items-center space-x-2"><FileText size={14} className="text-gray-400"/><span className="font-medium">{d.name}</span></div></td>
                  <td className="px-5 py-2.5 text-xs text-gray-500">{d.size}</td>
                  <td className="px-5 py-2.5 text-xs text-gray-500">{d.pages}p</td>
                  <td className="px-5 py-2.5 text-xs text-gray-500">{d.chunks}</td>
                  <td className="px-5 py-2.5 text-xs text-gray-400">{d.date}</td>
                  <td className="px-5 py-2.5"><span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${d.status==='Indexed'?'bg-green-50 text-green-700':'bg-blue-50 text-blue-700 animate-pulse'}`}>{d.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>}

      {/* === HISTORY TAB === */}
      {tab==='history'&&<>
        <div className="grid grid-cols-3 gap-4 mb-5">
          {[{l:'이번 달 질의',v:'342',sub:'전월 대비 +12%'},{l:'평균 응답시간',v:'1.1초',sub:'양호'},{l:'총 비용',v:'₩48,200',sub:'예산 25% 사용'}].map((s,i)=>(
            <div key={i} className="bg-white p-4 rounded-xl border"><div className="text-xs text-gray-500">{s.l}</div><div className="text-2xl font-bold mt-1">{s.v}</div><div className="text-[11px] text-gray-400 mt-0.5">{s.sub}</div></div>
          ))}
        </div>
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="px-5 py-3 bg-gray-50/80 border-b flex items-center justify-between">
            <h3 className="font-bold text-sm">대화 기록</h3>
            <div className="flex items-center space-x-2">
              <input placeholder="제목으로 검색" className="px-3 py-1.5 border rounded-lg text-xs"/>
              <select className="px-2 py-1.5 border rounded-lg text-xs bg-white"><option>전체 에이전트</option><option>안전규정 검색</option><option>HR 질의응답</option></select>
              <button onClick={()=>toast('대화 기록 내보내기 (데모)','info')} className="text-xs text-blue-600 hover:underline flex items-center"><Download size={12} className="mr-1"/>내보내기</button>
            </div>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-white text-[11px] text-gray-400"><tr>
              <th className="px-5 py-2.5 text-left font-medium">제목</th>
              <th className="px-5 py-2.5 text-left font-medium">에이전트</th>
              <th className="px-5 py-2.5 text-left font-medium">메시지</th>
              <th className="px-5 py-2.5 text-left font-medium">일시</th>
              <th className="px-5 py-2.5 text-center font-medium">즐겨찾기</th>
            </tr></thead>
            <tbody className="divide-y">
              {MOCK_RECENT_CHATS.map(c=>(
                <tr key={c.id} className="hover:bg-gray-50/50">
                  <td className="px-5 py-2.5 font-medium">{c.title}</td>
                  <td className="px-5 py-2.5 text-xs text-gray-500">{c.agent}</td>
                  <td className="px-5 py-2.5 text-xs">{c.msgs}개</td>
                  <td className="px-5 py-2.5 text-xs text-gray-400">{c.time}</td>
                  <td className="px-5 py-2.5 text-center">{c.starred?<Star size={14} className="text-yellow-500 fill-yellow-400 inline"/>:<Star size={14} className="text-gray-300 inline"/>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>}

      {/* === API KEYS TAB === */}
      {tab==='api'&&<>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">API 키는 외부 시스템에서 GenOS 에이전트를 호출할 때 사용합니다. 발급 후 즉시 표시되며, 분실 시 재발급해야 합니다.</p>
          <button onClick={()=>setShowCreateKey(true)} className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center"><Plus size={14} className="mr-1"/>키 발급</button>
        </div>
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50/80 text-[11px] text-gray-500"><tr>
              <th className="px-5 py-3 text-left font-medium">이름</th>
              <th className="px-5 py-3 text-left font-medium">키</th>
              <th className="px-5 py-3 text-left font-medium">권한</th>
              <th className="px-5 py-3 text-left font-medium">발급일</th>
              <th className="px-5 py-3 text-left font-medium">만료일</th>
              <th className="px-5 py-3 text-right font-medium">호출 수</th>
              <th className="px-5 py-3 text-center font-medium">관리</th>
            </tr></thead>
            <tbody className="divide-y">
              {apiKeys.map(k=>(
                <tr key={k.id} className="hover:bg-gray-50/50">
                  <td className="px-5 py-3 font-medium flex items-center space-x-2"><KeyRound size={14} className="text-gray-400"/><span>{k.name}</span></td>
                  <td className="px-5 py-3">
                    <div className="flex items-center space-x-1.5">
                      <code className="bg-gray-50 px-2 py-0.5 rounded text-xs font-mono">{showKey[k.id]?k.key:k.key.replace(/[^-]/g,'•').slice(0,24)+k.key.slice(-4)}</code>
                      <button onClick={()=>setShowKey(p=>({...p,[k.id]:!p[k.id]}))} className="text-gray-400 hover:text-blue-600"><Eye size={12}/></button>
                      <button onClick={()=>{navigator.clipboard?.writeText(k.key);toast('복사되었습니다');}} className="text-gray-400 hover:text-blue-600"><Copy size={12}/></button>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-xs text-gray-500">{k.scope}</td>
                  <td className="px-5 py-3 text-xs text-gray-400">{k.created}</td>
                  <td className="px-5 py-3 text-xs text-gray-400">{k.expires}</td>
                  <td className="px-5 py-3 text-right text-xs font-medium">{k.calls.toLocaleString()}</td>
                  <td className="px-5 py-3 text-center">
                    <button onClick={()=>toast('키가 재발급되었습니다','info')} className="text-[11px] text-blue-600 hover:underline mr-2">재발급</button>
                    <button onClick={()=>revokeKey(k.id)} className="text-[11px] text-red-600 hover:underline">삭제</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-5 bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start space-x-3">
          <AlertCircle size={18} className="text-blue-600 shrink-0 mt-0.5"/>
          <div className="text-xs text-blue-800">
            <div className="font-bold mb-1">API 키 사용 안내</div>
            <p>API 키는 외부에 노출되지 않도록 주의하시고, Authorization 헤더에 <code className="bg-white px-1 rounded">Bearer {`{API_KEY}`}</code> 형태로 사용합니다.</p>
            <p className="mt-1">시간당 호출 한도: 1,000회 · 일일 호출 한도: 2,000회 · 만료 30일 전 자동 알림이 발송됩니다.</p>
          </div>
        </div>
      </>}

      {/* === NOTIFICATIONS TAB === */}
      {tab==='notif'&&<>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium">전체</button>
            <button className="px-3 py-1.5 border rounded-lg text-xs font-medium hover:bg-gray-50">읽지 않음 ({unread})</button>
            <button className="px-3 py-1.5 border rounded-lg text-xs font-medium hover:bg-gray-50">권한</button>
            <button className="px-3 py-1.5 border rounded-lg text-xs font-medium hover:bg-gray-50">공지</button>
            <button className="px-3 py-1.5 border rounded-lg text-xs font-medium hover:bg-gray-50">시스템</button>
          </div>
          <button onClick={markAllRead} className="text-xs text-blue-600 hover:underline">모두 읽음 처리</button>
        </div>
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden divide-y">
          {notifs.map(n=>(
            <div key={n.id} onClick={()=>markRead(n.id)} className={`px-5 py-4 cursor-pointer hover:bg-gray-50 ${!n.read?'bg-blue-50/30':''}`}>
              <div className="flex items-start space-x-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${n.type==='approval'?'bg-green-50':n.type==='announce'?'bg-blue-50':n.type==='feedback'?'bg-purple-50':n.type==='system'?'bg-gray-100':'bg-orange-50'}`}>{notifIcon(n.type)}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{n.title}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] text-gray-400">{n.time}</span>
                      {!n.read&&<span className="w-2 h-2 bg-blue-600 rounded-full"/>}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{n.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>}

      {/* === PREFERENCES TAB === */}
      {tab==='prefs'&&<>
        <div className="grid grid-cols-2 gap-5">
          <div className="bg-white rounded-xl border shadow-sm p-5">
            <h3 className="font-bold text-sm mb-4 flex items-center"><SlidersHorizontal size={14} className="mr-1.5 text-gray-500"/>기본 설정</h3>
            <div className="space-y-4">
              <div><label className="text-xs text-gray-500 block mb-1">기본 모델</label>
                <select value={prefs.defaultModel} onChange={e=>setPrefs({...prefs,defaultModel:e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm bg-white">
                  <option>GPT-OSS-120B</option><option>Llama-3-Kor-Instruct</option><option>EXAONE-3.0-7.8B</option>
                </select>
              </div>
              <div><label className="text-xs text-gray-500 block mb-1">언어</label>
                <select value={prefs.language} onChange={e=>setPrefs({...prefs,language:e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm bg-white">
                  <option value="ko">한국어</option><option value="en">English</option>
                </select>
              </div>
              <div><label className="text-xs text-gray-500 block mb-1">화면 테마</label>
                <div className="flex space-x-2">
                  {['light','dark','auto'].map(t=><button key={t} onClick={()=>setPrefs({...prefs,theme:t})} className={`flex-1 px-3 py-2 rounded-lg text-xs border ${prefs.theme===t?'border-blue-500 bg-blue-50 text-blue-700 font-medium':'hover:bg-gray-50'}`}>{t==='light'?'라이트':t==='dark'?'다크':'자동'}</button>)}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border shadow-sm p-5">
            <h3 className="font-bold text-sm mb-4 flex items-center"><Bell size={14} className="mr-1.5 text-gray-500"/>알림 설정</h3>
            <div className="space-y-3">
              {[
                ['emailNotif','이메일 알림','권한, 공지, 시스템 이벤트'],
                ['slackNotif','Slack 알림','연동 채널로 푸시'],
                ['showSources','답변 출처 표시','RAG 검색 결과 청크 표시'],
                ['saveHistory','대화 기록 저장','30일간 자동 보관'],
              ].map(([k,l,d])=>(
                <div key={k} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <div><div className="text-sm font-medium">{l}</div><div className="text-[11px] text-gray-400">{d}</div></div>
                  <ToggleSwitch on={prefs[k]} onClick={()=>setPrefs(p=>({...p,[k]:!p[k]}))}/>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl border shadow-sm p-5">
            <h3 className="font-bold text-sm mb-4 flex items-center"><Lock size={14} className="mr-1.5 text-gray-500"/>보안</h3>
            <div className="space-y-3">
              <button className="w-full text-left px-3 py-2.5 border rounded-lg hover:bg-gray-50 flex items-center justify-between"><span className="text-sm">비밀번호 변경</span><ChevronRight size={14} className="text-gray-400"/></button>
              <button className="w-full text-left px-3 py-2.5 border rounded-lg hover:bg-gray-50 flex items-center justify-between"><span className="text-sm">2단계 인증 설정</span><span className="text-xs text-green-600 font-medium flex items-center"><Check size={12} className="mr-0.5"/>활성</span></button>
              <button className="w-full text-left px-3 py-2.5 border rounded-lg hover:bg-gray-50 flex items-center justify-between"><span className="text-sm">활성 세션 관리</span><span className="text-xs text-gray-400">3대</span></button>
              <button className="w-full text-left px-3 py-2.5 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 flex items-center justify-between"><span className="text-sm">모든 기기에서 로그아웃</span><Power size={14}/></button>
            </div>
          </div>
          <div className="bg-white rounded-xl border shadow-sm p-5">
            <h3 className="font-bold text-sm mb-4 flex items-center"><History size={14} className="mr-1.5 text-gray-500"/>데이터 관리</h3>
            <div className="space-y-3">
              <button onClick={()=>toast('내 데이터 내보내기 (데모)','info')} className="w-full text-left px-3 py-2.5 border rounded-lg hover:bg-gray-50 flex items-center justify-between"><span className="text-sm flex items-center"><Download size={14} className="mr-2 text-gray-400"/>내 데이터 내보내기</span><span className="text-xs text-gray-400">GDPR</span></button>
              <button onClick={()=>toast('대화 기록 일괄 삭제 (데모)','warning')} className="w-full text-left px-3 py-2.5 border rounded-lg hover:bg-gray-50 flex items-center justify-between"><span className="text-sm flex items-center"><Trash2 size={14} className="mr-2 text-gray-400"/>대화 기록 일괄 삭제</span><ChevronRight size={14} className="text-gray-400"/></button>
              <button className="w-full text-left px-3 py-2.5 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 flex items-center justify-between"><span className="text-sm">계정 탈퇴 신청</span><AlertTriangle size={14}/></button>
            </div>
          </div>
        </div>
      </>}

      {/* Modals */}
      <Modal isOpen={showEdit} onClose={()=>setShowEdit(false)} title="프로필 수정" size="md">
        <div className="space-y-4">
          {[['이름','name'],['직위','position'],['부서','dept'],['이메일','email'],['전화','phone']].map(([label,key])=>(
            <div key={key}><label className="block text-sm font-medium mb-1">{label}</label><input value={editForm[key]} onChange={e=>setEditForm({...editForm,[key]:e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm"/></div>
          ))}
          <button onClick={()=>{setProfile(editForm);setShowEdit(false);toast('프로필이 수정되었습니다');}} className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium text-sm">저장</button>
        </div>
      </Modal>
      <Modal isOpen={showNewKa} onClose={()=>setShowNewKa(false)} title="개인 지식영역 생성" size="md">
        <div className="space-y-4">
          <div><label className="block text-sm font-medium mb-1">지식영역 이름</label><input value={newKaName} onChange={e=>setNewKaName(e.target.value)} placeholder="예: 2026 프로젝트" className="w-full border rounded-lg px-3 py-2 text-sm"/></div>
          <div><label className="block text-sm font-medium mb-1">설명 (선택)</label><textarea rows={3} className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="이 지식영역의 목적과 포함될 문서 종류를 적어주세요."/></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-sm font-medium mb-1">Chunk Size</label><input type="number" defaultValue={512} className="w-full border rounded-lg px-3 py-2 text-sm"/></div>
            <div><label className="block text-sm font-medium mb-1">Overlap</label><input type="number" defaultValue={50} className="w-full border rounded-lg px-3 py-2 text-sm"/></div>
          </div>
          <button onClick={createKa} className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium text-sm">생성</button>
        </div>
      </Modal>
      <Modal isOpen={showCreateKey} onClose={()=>setShowCreateKey(false)} title="API 키 발급" size="md">
        <div className="space-y-4">
          <div><label className="block text-sm font-medium mb-1">키 이름</label><input value={newKeyName} onChange={e=>setNewKeyName(e.target.value)} placeholder="예: 보고서 자동화" className="w-full border rounded-lg px-3 py-2 text-sm"/></div>
          <div><label className="block text-sm font-medium mb-1">권한 범위</label>
            <select value={newKeyScope} onChange={e=>setNewKeyScope(e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm bg-white">
              <option>에이전트 호출</option><option>보고서 생성, 데이터 조회</option><option>전체</option>
            </select>
          </div>
          <div><label className="block text-sm font-medium mb-1">만료 기간</label>
            <select className="w-full border rounded-lg px-3 py-2 text-sm bg-white"><option>1년</option><option>6개월</option><option>3개월</option><option>무기한</option></select>
          </div>
          <button onClick={createKey} className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium text-sm">발급</button>
        </div>
      </Modal>
    </PageShell>
  );
};

// ==================== SERVICE MOCK DATA ====================
const SERVICE_SUGGESTED_PROMPTS = [
  {icon:Shield,t:'안전 규정 검색',q:'LNG 저장탱크 정기 점검 주기와 점검 항목을 알려줘',cat:'안전',color:'bg-red-50 text-red-700 border-red-200'},
  {icon:Users,t:'HR 규정 질의',q:'2026년 연차 사용 기준과 잔여 연차 이월 규정 정리해줘',cat:'HR',color:'bg-blue-50 text-blue-700 border-blue-200'},
  {icon:FileText,t:'보고서 작성',q:'1분기 가스 설비 점검 현황을 보고서 형식으로 작성해줘',cat:'문서',color:'bg-purple-50 text-purple-700 border-purple-200'},
  {icon:BarChart3,t:'데이터 분석',q:'첨부한 점검 이력 CSV에서 이상 패턴을 찾아줘',cat:'분석',color:'bg-green-50 text-green-700 border-green-200'},
  {icon:Languages,t:'기술문서 번역',q:'다음 기술 매뉴얼을 한국어로 번역해줘',cat:'유틸',color:'bg-yellow-50 text-yellow-700 border-yellow-200'},
  {icon:NotebookPen,t:'회의록 정리',q:'첨부한 회의 녹취록을 결정사항/액션아이템 중심으로 정리해줘',cat:'유틸',color:'bg-pink-50 text-pink-700 border-pink-200'},
];

const SERVICE_AGENT_CATEGORIES = [
  {id:'all',label:'전체',count:24},
  {id:'safety',label:'안전·점검',count:6},
  {id:'hr',label:'HR·총무',count:4},
  {id:'legal',label:'법무·계약',count:3},
  {id:'tech',label:'기술·연구',count:5},
  {id:'finance',label:'재무·회계',count:3},
  {id:'edu',label:'교육·문서',count:3},
];

const SERVICE_FEATURED_AGENTS = [
  {id:'AGT-001',name:'안전규정 검색 에이전트',desc:'사내 안전 규정/매뉴얼 즉시 검색·요약. 출처 청크 인용.',cat:'safety',calls:342,rating:4.7,model:'GPT-OSS-120B',pinned:true,badge:'인기',iconBg:'from-red-500 to-rose-500'},
  {id:'AGT-002',name:'설비 진단 어시스턴트',desc:'IoT 센서 + 설비 이력 분석으로 점검 절차 자동 안내.',cat:'tech',calls:189,rating:4.6,model:'Llama-3-Kor',pinned:false,badge:'추천',iconBg:'from-blue-500 to-cyan-500'},
  {id:'AGT-003',name:'HR 질의응답 봇',desc:'연차, 복리후생, 인사 규정. 24시간 즉시 응답.',cat:'hr',calls:567,rating:4.8,model:'EXAONE-3.0',pinned:true,badge:'베스트',iconBg:'from-emerald-500 to-teal-500'},
  {id:'AGT-004',name:'계약서 검토 에이전트',desc:'리스크 조항 자동 식별·정리, 법무팀 HITL 연동.',cat:'legal',calls:45,rating:4.9,model:'GPT-OSS-120B',pinned:false,badge:'신규',iconBg:'from-purple-500 to-fuchsia-500'},
  {id:'AGT-006',name:'기술 교육 튜터',desc:'신입사원 및 기술직 교육 질의응답. 단계별 설명.',cat:'edu',calls:231,rating:4.5,model:'EXAONE-3.0',pinned:true,badge:'',iconBg:'from-orange-500 to-amber-500'},
  {id:'AGT-007',name:'비상 대응 가이드',desc:'가스 누출 등 비상 상황 실시간 대응 절차 안내.',cat:'safety',calls:12,rating:5.0,model:'GPT-OSS-120B',pinned:false,badge:'필수',iconBg:'from-red-600 to-orange-600'},
  {id:'AGT-008',name:'회계전표 자동 작성',desc:'ERP 연동, 업무 지시 → 전표 자동 생성 (HITL).',cat:'finance',calls:78,rating:4.4,model:'GPT-OSS-120B',pinned:false,badge:'신규',iconBg:'from-indigo-500 to-blue-600'},
  {id:'AGT-009',name:'영문 기술문서 번역',desc:'설비 매뉴얼 영↔한 전문 번역, 용어집 자동 적용.',cat:'edu',calls:154,rating:4.6,model:'GPT-OSS-120B',pinned:false,badge:'',iconBg:'from-yellow-500 to-orange-500'},
  {id:'AGT-010',name:'위험성 평가 도우미',desc:'중대재해법 대응 위험성 평가서 초안 자동 작성.',cat:'safety',calls:67,rating:4.7,model:'Llama-3-Kor',pinned:false,badge:'',iconBg:'from-rose-500 to-red-600'},
  {id:'AGT-011',name:'예산 집행 분석',desc:'부서별 예산 집행 현황 자동 리포팅·이상치 알림.',cat:'finance',calls:32,rating:4.3,model:'EXAONE-3.0',pinned:false,badge:'',iconBg:'from-teal-500 to-emerald-600'},
  {id:'AGT-012',name:'사내 검색 도우미',desc:'사내 문서/그룹웨어 통합 검색 + 위치 안내.',cat:'edu',calls:412,rating:4.5,model:'EXAONE-3.0',pinned:true,badge:'',iconBg:'from-sky-500 to-indigo-500'},
];

const SERVICE_RECENT_CONVS = [
  {id:1,title:'LNG 저장탱크 안전밸브 설정압력',agent:'안전규정 검색 에이전트',time:'14:32',preview:'LNG 저장탱크의 안전밸브는 설계압력의 110%로 설정되며...',pinned:true},
  {id:2,title:'2026 연차 사용 가이드',agent:'HR 질의응답 봇',time:'어제',preview:'근로기준법 60조에 따라 1년 미만 근로자는 1개월 개근 시...',pinned:false},
  {id:3,title:'가스 누출 비상 대응 절차',agent:'비상 대응 가이드',time:'어제',preview:'1단계 누출 감지 시 즉시 차단 밸브 폐쇄 후 환기...',pinned:true},
  {id:4,title:'1분기 안전점검 보고서 초안',agent:'안전규정 검색 에이전트',time:'2일 전',preview:'1분기 안전점검 결과 총 124건의 점검을 수행했으며...',pinned:false},
  {id:5,title:'수의계약 한도액 기준',agent:'계약서 검토 에이전트',time:'1주 전',preview:'수의계약은 추정가격이 2천만원 이하인 경우에 한하여...',pinned:false},
  {id:6,title:'중대재해처벌법 대응 가이드',agent:'위험성 평가 도우미',time:'1주 전',preview:'중대재해처벌법 시행에 따라 사업주는 안전보건관리체계를...',pinned:false},
  {id:7,title:'신입사원 안전교육 자료',agent:'기술 교육 튜터',time:'2주 전',preview:'한국가스기술공사 신입사원 안전교육은 4주 과정으로...',pinned:false},
];

const SERVICE_SAMPLE_CHAT = [
  {role:'user',content:'LNG 저장탱크 정기 점검 주기와 점검 항목을 알려줘',time:'14:32'},
  {role:'assistant',content:`LNG 저장탱크의 정기 점검은 「고압가스 안전관리법 시행규칙」 제29조 및 사내 「LNG 설비 유지관리 기준 v2.1」에 따라 다음과 같이 수행됩니다.

**점검 주기**
- **일상 점검**: 매일 1회 (운영 부서 자체 점검)
- **정기 점검**: 매월 1회 (안전관리부 합동 점검)
- **정밀 점검**: 매 6개월 1회 (외부 전문 기관 의뢰)
- **개방 점검**: 매 4년 1회 (탱크 내부 진입 검사)

**주요 점검 항목**
1. 외관 검사 — 균열, 부식, 단열재 손상 여부
2. 안전밸브 작동 시험 — 설정압력의 110% ± 3%
3. 가스 누출 감지기 작동 시험
4. 액위계·온도계·압력계 교정 상태
5. 접지 저항 측정 (10Ω 이하)
6. 전기 설비 절연 저항 측정

**관련 규정 위반 시**: 안전관리법 제43조에 따라 즉시 운영 중단 및 보수 조치가 필요합니다.`,time:'14:32',sources:[
    {title:'LNG 설비 유지관리 기준 v2.1.pdf',page:24,chunk:'제3장 정기 점검 항목 및 주기 ...',score:0.94},
    {title:'고압가스 안전관리법 시행규칙.pdf',page:17,chunk:'제29조 (정기 검사) ① 저장 설비는 ...',score:0.89},
    {title:'2026 안전관리 매뉴얼 v2.1.pdf',page:62,chunk:'LNG 탱크 점검 체크리스트 ...',score:0.81},
  ]},
];

const SERVICE_REPORT_TEMPLATES = [
  {id:'rpt-safety',name:'안전 점검 보고서',desc:'현장 점검 결과를 정형화된 보고서로 작성',icon:Shield,color:'from-red-500 to-rose-500',sections:['점검 개요','점검 결과','발견 사항','조치 계획'],time:'3분',uses:248},
  {id:'rpt-monthly',name:'월간 운영 보고',desc:'KPI/실적/주요 이슈를 월간 보고 형식으로 정리',icon:BarChart3,color:'from-blue-500 to-indigo-500',sections:['핵심 성과','상세 실적','이슈 및 대응','다음 달 계획'],time:'5분',uses:189},
  {id:'rpt-risk',name:'위험성 평가서',desc:'중대재해처벌법 대응 위험성 평가 자동 작성',icon:AlertTriangle,color:'from-orange-500 to-amber-500',sections:['평가 대상','위험 요인','심각도/빈도','감소 대책'],time:'7분',uses:124},
  {id:'rpt-meeting',name:'회의록',desc:'녹취록/메모를 회의록 양식으로 정리',icon:NotebookPen,color:'from-emerald-500 to-teal-500',sections:['참석자','안건','결정 사항','액션 아이템'],time:'2분',uses:412},
  {id:'rpt-edu',name:'교육 자료',desc:'기술 주제를 슬라이드용 교육자료로 변환',icon:BookOpen,color:'from-purple-500 to-fuchsia-500',sections:['학습 목표','핵심 개념','사례','퀴즈'],time:'4분',uses:89},
  {id:'rpt-rfp',name:'제안 요약',desc:'제안서/RFP 문서를 핵심 사항 중심으로 요약',icon:FileText,color:'from-cyan-500 to-blue-500',sections:['배경','요구사항','평가 기준','일정/예산'],time:'5분',uses:67},
];

const SERVICE_IMAGE_STYLES = [
  {id:'photo',name:'사실적 사진',desc:'실사 풍 고해상도',sample:'from-slate-500 to-zinc-700'},
  {id:'illust',name:'일러스트',desc:'벡터 일러스트 스타일',sample:'from-pink-400 to-orange-400'},
  {id:'diagram',name:'다이어그램',desc:'기술 다이어그램/도면',sample:'from-sky-400 to-blue-600'},
  {id:'info',name:'인포그래픽',desc:'데이터 시각화 풍',sample:'from-emerald-400 to-teal-600'},
  {id:'3d',name:'3D 렌더',desc:'3D 모델 렌더링',sample:'from-violet-500 to-purple-700'},
  {id:'sketch',name:'스케치',desc:'손그림/스케치 풍',sample:'from-amber-300 to-orange-500'},
];

const SERVICE_RECENT_IMAGES = [
  {id:1,prompt:'LNG 저장탱크 안전 점검 절차 인포그래픽',style:'info',ratio:'16:9',time:'10분 전',gradient:'from-emerald-400 via-teal-500 to-cyan-600'},
  {id:2,prompt:'가스 배관 단면 다이어그램, 한국어 라벨',style:'diagram',ratio:'4:3',time:'2시간 전',gradient:'from-sky-400 via-blue-500 to-indigo-600'},
  {id:3,prompt:'안전모를 쓴 엔지니어가 설비를 점검하는 모습',style:'photo',ratio:'1:1',time:'어제',gradient:'from-slate-500 via-zinc-600 to-stone-700'},
  {id:4,prompt:'친환경 에너지 전환 콘셉트 일러스트',style:'illust',ratio:'16:9',time:'어제',gradient:'from-pink-400 via-rose-500 to-orange-500'},
  {id:5,prompt:'가스 공급망 3D 모델, 청록색 톤',style:'3d',ratio:'4:3',time:'2일 전',gradient:'from-violet-500 via-purple-600 to-fuchsia-700'},
  {id:6,prompt:'2026 신년 안전 캠페인 포스터',style:'illust',ratio:'9:16',time:'3일 전',gradient:'from-amber-400 via-orange-500 to-red-500'},
];

const SERVICE_QUICK_TOOLS = [
  {id:'translate',name:'번역',desc:'한↔영, 한↔일 전문 번역',icon:Languages,color:'bg-blue-50 text-blue-700'},
  {id:'summary',name:'요약',desc:'긴 글을 핵심 중심으로 요약',icon:FileText,color:'bg-emerald-50 text-emerald-700'},
  {id:'mail',name:'메일 작성',desc:'상황별 비즈니스 메일 초안',icon:Mail,color:'bg-purple-50 text-purple-700'},
  {id:'meeting',name:'회의록',desc:'녹취록/메모 → 회의록 정리',icon:NotebookPen,color:'bg-orange-50 text-orange-700'},
  {id:'proofread',name:'맞춤법 검사',desc:'한글 맞춤법·문장 다듬기',icon:PenLine,color:'bg-pink-50 text-pink-700'},
  {id:'ideas',name:'아이디어 발산',desc:'주제에 대한 다각도 아이디어',icon:Sparkles,color:'bg-yellow-50 text-yellow-700'},
];

const SERVICE_BANNER = {
  greeting:'안녕하세요, 김영빈님',
  subtitle:'오늘은 어떤 업무를 도와드릴까요?',
  tip:'💡 새 기능: 이미지 생성 + 보고서 자동 작성이 추가되었습니다',
};

const SERVICE_SAMPLE_DATA = [
  {col:'점검일자',vals:['2026-02-01','2026-02-03','2026-02-05','2026-02-07','2026-02-10']},
  {col:'설비ID',vals:['LNG-T-01','LNG-T-02','LNG-T-01','LNG-P-15','LNG-T-03']},
  {col:'압력(MPa)',vals:[0.85,0.92,1.12,0.78,0.88]},
  {col:'온도(°C)',vals:[-162,-160,-145,-163,-161]},
  {col:'결과',vals:['정상','정상','이상','정상','정상']},
];

// ==================== SERVICE PAGES ====================
const ServicePageShell = ({children,padding=true}) => (
  <div className={`h-full overflow-y-auto ${padding?'p-7':''} animate-in`}>
    {children}
  </div>
);

const ServiceHome = ({onNav,onStartChat}) => {
  const toast=useToast();
  return (
    <ServicePageShell>
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 rounded-3xl p-8 mb-6 text-white shadow-lg overflow-hidden">
        <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-white/10 blur-3xl"/>
        <div className="absolute -right-32 bottom-0 w-64 h-64 rounded-full bg-cyan-300/20 blur-3xl"/>
        <div className="relative">
          <div className="text-3xl font-bold mb-1">{SERVICE_BANNER.greeting} 👋</div>
          <div className="text-lg opacity-90 mb-4">{SERVICE_BANNER.subtitle}</div>
          <div className="inline-flex items-center bg-white/20 backdrop-blur rounded-full px-4 py-1.5 text-sm">{SERVICE_BANNER.tip}</div>
          <div className="mt-6 max-w-3xl">
            <div className="bg-white rounded-2xl p-2 flex items-center shadow-xl">
              <input onKeyDown={e=>e.key==='Enter'&&e.target.value&&onStartChat(e.target.value)} placeholder="무엇이든 물어보세요. 예: 가스 누출 시 대응 절차는?" className="flex-1 px-4 py-3 text-gray-800 text-sm outline-none"/>
              <button className="p-2 text-gray-400 hover:text-gray-700"><Paperclip size={18}/></button>
              <button className="p-2 text-gray-400 hover:text-gray-700"><Mic size={18}/></button>
              <button onClick={()=>onStartChat('새 대화')} className="bg-blue-600 text-white p-2.5 rounded-xl hover:bg-blue-700 ml-1"><ArrowUp size={18}/></button>
            </div>
          </div>
        </div>
      </div>

      {/* Suggested prompts */}
      <div className="mb-6">
        <h3 className="font-bold text-gray-900 mb-3 flex items-center"><Sparkles size={16} className="mr-1.5 text-yellow-500"/>추천 프롬프트</h3>
        <div className="grid grid-cols-3 gap-3">
          {SERVICE_SUGGESTED_PROMPTS.map((p,i)=>(
            <div key={i} onClick={()=>onStartChat(p.q)} className={`p-4 rounded-xl border-2 cursor-pointer hover:scale-[1.02] hover:shadow-md transition-all ${p.color}`}>
              <div className="flex items-center justify-between mb-2"><p.icon size={20}/><span className="text-[10px] font-semibold uppercase opacity-70">{p.cat}</span></div>
              <div className="font-bold text-sm mb-1">{p.t}</div>
              <div className="text-xs opacity-80 line-clamp-2">{p.q}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured agents + Recent */}
      <div className="grid grid-cols-3 gap-5 mb-6">
        <div className="col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-900 flex items-center"><Bot size={16} className="mr-1.5 text-blue-600"/>추천 에이전트</h3>
            <button onClick={()=>onNav('svc.agents')} className="text-xs text-blue-600 hover:underline flex items-center">전체 보기<ChevronRight size={12}/></button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {SERVICE_FEATURED_AGENTS.slice(0,4).map(a=>(
              <div key={a.id} onClick={()=>onStartChat('',a)} className="bg-white rounded-xl border p-4 hover:border-blue-400 hover:shadow-md cursor-pointer transition-all">
                <div className="flex items-start justify-between mb-2">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${a.iconBg} flex items-center justify-center text-white shrink-0`}><Bot size={18}/></div>
                  {a.badge&&<span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">{a.badge}</span>}
                </div>
                <div className="font-bold text-sm mb-1">{a.name}</div>
                <div className="text-xs text-gray-500 line-clamp-2 mb-2">{a.desc}</div>
                <div className="flex items-center justify-between text-[11px] text-gray-400 pt-2 border-t">
                  <span className="flex items-center"><Star size={10} className="text-yellow-500 fill-yellow-400 mr-0.5"/>{a.rating}</span>
                  <span>{a.calls}회 사용</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-900 flex items-center"><History size={16} className="mr-1.5 text-purple-600"/>최근 대화</h3>
            <button onClick={()=>onNav('svc.history')} className="text-xs text-blue-600 hover:underline">전체</button>
          </div>
          <div className="bg-white rounded-xl border divide-y overflow-hidden">
            {SERVICE_RECENT_CONVS.slice(0,5).map(c=>(
              <div key={c.id} onClick={()=>onNav('svc.chat')} className="p-3 hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center justify-between mb-0.5">
                  <div className="flex items-center space-x-1 min-w-0">
                    {c.pinned&&<Pin size={10} className="text-blue-500 shrink-0"/>}
                    <span className="text-sm font-medium truncate">{c.title}</span>
                  </div>
                  <span className="text-[10px] text-gray-400 shrink-0 ml-2">{c.time}</span>
                </div>
                <div className="text-[11px] text-gray-500 truncate">{c.agent}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick tool cards */}
      <h3 className="font-bold text-gray-900 mb-3 flex items-center"><Wand2 size={16} className="mr-1.5 text-purple-600"/>빠른 도구</h3>
      <div className="grid grid-cols-6 gap-3 mb-6">
        {SERVICE_QUICK_TOOLS.map(t=>(
          <div key={t.id} onClick={()=>onNav('svc.tools')} className="bg-white rounded-xl border p-4 hover:border-purple-400 hover:shadow-md cursor-pointer transition-all text-center">
            <div className={`w-10 h-10 rounded-xl ${t.color} flex items-center justify-center mx-auto mb-2`}><t.icon size={18}/></div>
            <div className="font-bold text-xs">{t.name}</div>
            <div className="text-[10px] text-gray-500 mt-0.5 line-clamp-1">{t.desc}</div>
          </div>
        ))}
      </div>

      {/* Today's announcements + ROI banner */}
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2 bg-white rounded-xl border p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-900 flex items-center"><Megaphone size={16} className="mr-1.5 text-orange-600"/>오늘의 공지</h3>
            <button className="text-xs text-blue-600 hover:underline">전체</button>
          </div>
          <div className="divide-y">
            {[
              {cat:'점검',title:'시스템 정기 점검 안내 (2/15 02:00~06:00)',date:'2/13',color:'bg-orange-50 text-orange-700'},
              {cat:'업데이트',title:'신규 모델 Solar-10.7B 서비스 추가',date:'2/10',color:'bg-green-50 text-green-700'},
              {cat:'공지',title:'GenOS AI 플랫폼 정식 오픈 안내',date:'2/01',color:'bg-blue-50 text-blue-700'},
            ].map((a,i)=>(
              <div key={i} className="py-2.5 flex items-center justify-between cursor-pointer hover:bg-gray-50 rounded px-2">
                <div className="flex items-center space-x-2 min-w-0">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${a.color}`}>{a.cat}</span>
                  <span className="text-sm font-medium truncate">{a.title}</span>
                </div>
                <span className="text-[11px] text-gray-400 shrink-0 ml-2">{a.date}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-5 text-white shadow-md">
          <div className="flex items-center justify-between mb-3"><TrendingUp size={20}/><span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">이번 달</span></div>
          <div className="text-3xl font-bold">23.4h</div>
          <div className="text-sm opacity-90 mt-1">절감된 업무 시간</div>
          <div className="mt-3 pt-3 border-t border-white/20 text-xs opacity-90">
            ✨ AI 활용으로 평균 <span className="font-bold">42%</span>의 시간을 절약하고 있어요
          </div>
        </div>
      </div>
    </ServicePageShell>
  );
};

const ServiceChat = ({initialPrompt='',initialAgent=null}) => {
  const toast=useToast();
  const [agent,setAgent]=useState(initialAgent||SERVICE_FEATURED_AGENTS[0]);
  const [showAgentPicker,setShowAgentPicker]=useState(false);
  const [convs,setConvs]=useState(SERVICE_RECENT_CONVS);
  const [activeConv,setActiveConv]=useState(1);
  const [msgs,setMsgs]=useState(SERVICE_SAMPLE_CHAT);
  const [input,setInput]=useState(initialPrompt);
  const [sending,setSending]=useState(false);
  const [showSources,setShowSources]=useState(true);
  const [showLeftRail,setShowLeftRail]=useState(true);
  const [tools,setTools]=useState({rag:true,web:false,code:false,image:false});
  const [convSearch,setConvSearch]=useState('');
  const endRef=useRef(null);
  useEffect(()=>{endRef.current?.scrollIntoView({behavior:'smooth'});},[msgs]);
  useEffect(()=>{if(initialPrompt)setInput(initialPrompt);},[initialPrompt]);
  const send=()=>{
    if(!input.trim())return;
    const userMsg={role:'user',content:input,time:'지금'};
    setMsgs(p=>[...p,userMsg]);
    setInput('');setSending(true);
    setTimeout(()=>{
      setMsgs(p=>[...p,{role:'assistant',content:`"${userMsg.content}" 에 대해 답변드리겠습니다.\n\n관련 사내 규정 및 매뉴얼을 참조한 결과, 다음과 같은 답변을 제공합니다:\n\n**핵심 내용**\n- 관련 규정: 사내 안전관리 규정 제3장\n- 적용 범위: 전 사업장\n- 책임 부서: 안전관리처\n\n**상세 절차**\n1. 1단계: 즉시 보고 및 초동 대응\n2. 2단계: 안전 점검 실시\n3. 3단계: 결과 문서화\n\n추가로 궁금하신 사항이 있으시면 말씀해 주세요.`,time:'지금',sources:[{title:'안전관리 규정 v2.1.pdf',page:24,chunk:'제3장 안전 점검 절차 ...',score:0.91},{title:'비상대응 매뉴얼.pdf',page:8,chunk:'1.2 초동 대응 ...',score:0.85}]}]);
      setSending(false);
    },1200);
  };
  const newChat=()=>{
    setMsgs([]);
    setActiveConv(null);
    toast('새 대화를 시작합니다','info');
  };
  const filteredConvs=convs.filter(c=>!convSearch||c.title.includes(convSearch));
  return (
    <div className="flex h-full bg-white">
      {/* Left rail: conversations */}
      {showLeftRail && (
        <div className="w-72 border-r flex flex-col bg-gray-50/40 shrink-0">
          <div className="p-3 border-b flex items-center space-x-2">
            <button onClick={newChat} className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-center"><Plus size={14} className="mr-1"/>새 대화</button>
            <button onClick={()=>setShowLeftRail(false)} className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg"><PanelLeftClose size={16}/></button>
          </div>
          <div className="p-3 border-b">
            <div className="relative">
              <input value={convSearch} onChange={e=>setConvSearch(e.target.value)} placeholder="대화 검색..." className="w-full pl-8 pr-3 py-2 border rounded-lg text-xs bg-white"/>
              <Search size={12} className="absolute left-2.5 top-2.5 text-gray-400"/>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="px-3 pt-2 pb-1 text-[10px] font-bold text-gray-400 uppercase">고정</div>
            {filteredConvs.filter(c=>c.pinned).map(c=>(
              <div key={c.id} onClick={()=>{setActiveConv(c.id);setMsgs(SERVICE_SAMPLE_CHAT);}} className={`mx-2 my-1 px-3 py-2 rounded-lg cursor-pointer text-sm ${activeConv===c.id?'bg-blue-50 text-blue-700 font-medium':'hover:bg-gray-100'}`}>
                <div className="flex items-center space-x-1.5 mb-0.5"><Pin size={10} className="text-blue-500 shrink-0"/><span className="truncate">{c.title}</span></div>
                <div className="text-[10px] text-gray-400 truncate">{c.agent} · {c.time}</div>
              </div>
            ))}
            <div className="px-3 pt-3 pb-1 text-[10px] font-bold text-gray-400 uppercase">최근</div>
            {filteredConvs.filter(c=>!c.pinned).map(c=>(
              <div key={c.id} onClick={()=>{setActiveConv(c.id);setMsgs(SERVICE_SAMPLE_CHAT);}} className={`mx-2 my-1 px-3 py-2 rounded-lg cursor-pointer text-sm ${activeConv===c.id?'bg-blue-50 text-blue-700 font-medium':'hover:bg-gray-100'}`}>
                <div className="truncate mb-0.5">{c.title}</div>
                <div className="text-[10px] text-gray-400 truncate">{c.agent} · {c.time}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main chat */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat header */}
        <div className="border-b px-5 py-3 flex items-center justify-between bg-white">
          <div className="flex items-center space-x-3 min-w-0">
            {!showLeftRail && <button onClick={()=>setShowLeftRail(true)} className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg"><List size={16}/></button>}
            <div className="relative">
              <button onClick={()=>setShowAgentPicker(v=>!v)} className="flex items-center space-x-2 px-3 py-1.5 hover:bg-gray-100 rounded-lg">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${agent.iconBg} flex items-center justify-center text-white shrink-0`}><Bot size={16}/></div>
                <div className="text-left min-w-0">
                  <div className="text-sm font-bold truncate">{agent.name}</div>
                  <div className="text-[10px] text-gray-500">{agent.model}</div>
                </div>
                <ChevronDown size={14} className="text-gray-400"/>
              </button>
              {showAgentPicker && (
                <div className="absolute top-full left-0 mt-1 w-80 bg-white border rounded-xl shadow-xl z-20 max-h-96 overflow-y-auto">
                  <div className="p-2 border-b text-[11px] font-bold text-gray-500">에이전트 선택</div>
                  {SERVICE_FEATURED_AGENTS.map(a=>(
                    <div key={a.id} onClick={()=>{setAgent(a);setShowAgentPicker(false);toast(`${a.name} 으로 전환`);}} className="px-3 py-2 hover:bg-gray-50 cursor-pointer flex items-center space-x-2">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${a.iconBg} flex items-center justify-center text-white shrink-0`}><Bot size={14}/></div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium truncate">{a.name}</div>
                        <div className="text-[10px] text-gray-500 truncate">{a.desc}</div>
                      </div>
                      {agent.id===a.id&&<Check size={14} className="text-blue-600"/>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <button onClick={()=>toast('대화를 공유합니다','info')} className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg" title="공유"><ExternalLink size={16}/></button>
            <button onClick={()=>toast('대화를 다운로드합니다','info')} className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg" title="내보내기"><Download size={16}/></button>
            <button onClick={()=>setShowSources(v=>!v)} className={`p-2 rounded-lg ${showSources?'bg-blue-50 text-blue-600':'text-gray-400 hover:bg-gray-100'}`} title="출처 패널"><BookOpen size={16}/></button>
            <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg"><MoreHorizontal size={16}/></button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto bg-[#FAFAFA]">
          {msgs.length===0?(
            <div className="h-full flex flex-col items-center justify-center text-center px-8">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${agent.iconBg} flex items-center justify-center text-white mb-4 shadow-lg`}><Bot size={28}/></div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">{agent.name}</h2>
              <p className="text-sm text-gray-500 max-w-md mb-6">{agent.desc}</p>
              <div className="grid grid-cols-2 gap-2 max-w-2xl w-full">
                {SERVICE_SUGGESTED_PROMPTS.slice(0,4).map((p,i)=>(
                  <div key={i} onClick={()=>{setInput(p.q);}} className="p-3 border rounded-xl text-left hover:border-blue-400 hover:bg-blue-50/50 cursor-pointer">
                    <div className="flex items-center space-x-2 mb-1"><p.icon size={14} className="text-blue-600"/><span className="text-xs font-bold">{p.t}</span></div>
                    <div className="text-xs text-gray-500 line-clamp-2">{p.q}</div>
                  </div>
                ))}
              </div>
            </div>
          ):(
            <div className="max-w-3xl mx-auto py-6 px-6 space-y-5">
              {msgs.map((m,i)=>(
                <div key={i} className={`flex ${m.role==='user'?'justify-end':'justify-start'}`}>
                  {m.role==='assistant' && <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${agent.iconBg} flex items-center justify-center text-white mr-3 mt-1 shrink-0`}><Bot size={14}/></div>}
                  <div className={`${m.role==='user'?'max-w-[80%] bg-blue-600 text-white':'flex-1 bg-white border'} rounded-2xl px-4 py-3 shadow-sm`}>
                    <div className={`text-sm whitespace-pre-wrap leading-relaxed ${m.role==='user'?'text-white':'text-gray-800'}`}>{m.content}</div>
                    {m.sources && (
                      <div className="mt-3 pt-3 border-t">
                        <div className="text-[11px] font-bold text-gray-500 mb-2 flex items-center"><BookOpen size={11} className="mr-1"/>출처 ({m.sources.length})</div>
                        <div className="space-y-1.5">
                          {m.sources.map((s,j)=>(
                            <div key={j} className="bg-gray-50 rounded-lg px-2.5 py-1.5 flex items-center justify-between">
                              <div className="flex items-center space-x-1.5 min-w-0">
                                <FileText size={11} className="text-gray-400 shrink-0"/>
                                <span className="text-[11px] font-medium truncate">{s.title}</span>
                                <span className="text-[10px] text-gray-400">p.{s.page}</span>
                              </div>
                              <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold ml-2 shrink-0">{(s.score*100).toFixed(0)}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {m.role==='assistant' && (
                      <div className="mt-2 pt-2 border-t flex items-center space-x-1">
                        <button onClick={()=>toast('좋은 답변으로 평가했습니다')} className="p-1 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded"><ThumbsUp size={12}/></button>
                        <button onClick={()=>toast('피드백이 접수되었습니다','info')} className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"><ThumbsDown size={12}/></button>
                        <button onClick={()=>{navigator.clipboard?.writeText(m.content);toast('복사되었습니다');}} className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded"><Copy size={12}/></button>
                        <button className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded"><RotateCcw size={12}/></button>
                        <button onClick={()=>toast('음성 재생','info')} className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded"><Volume2 size={12}/></button>
                        <span className="text-[10px] text-gray-400 ml-auto">{m.time}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {sending && (
                <div className="flex items-start">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${agent.iconBg} flex items-center justify-center text-white mr-3 mt-1 shrink-0`}><Bot size={14}/></div>
                  <div className="bg-white border rounded-2xl px-4 py-3 shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay:'0s'}}/>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay:'0.2s'}}/>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay:'0.4s'}}/>
                    </div>
                  </div>
                </div>
              )}
              <div ref={endRef}/>
            </div>
          )}
        </div>

        {/* Input bar */}
        <div className="border-t bg-white p-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center space-x-1 mb-2 text-[11px]">
              <span className="text-gray-400 mr-1">도구:</span>
              {[
                ['rag','지식 참조',BookOpen],
                ['web','웹 검색',Globe],
                ['code','코드 실행',Code],
                ['image','이미지 분석',ImageIcon],
              ].map(([k,l,Ic])=>(
                <button key={k} onClick={()=>setTools(p=>({...p,[k]:!p[k]}))} className={`flex items-center space-x-1 px-2 py-1 rounded-lg border ${tools[k]?'bg-blue-50 border-blue-300 text-blue-700':'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
                  <Ic size={11}/><span>{l}</span>
                </button>
              ))}
            </div>
            <div className="border-2 border-gray-200 rounded-2xl p-2 focus-within:border-blue-400 transition-colors bg-white">
              <textarea value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send();}}} rows={1} placeholder={`${agent.name}에게 메시지를 입력하세요 (Shift+Enter 줄바꿈)`} className="w-full px-2 py-1.5 text-sm outline-none resize-none max-h-32"/>
              <div className="flex items-center justify-between mt-1">
                <div className="flex items-center space-x-1">
                  <button className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg"><Paperclip size={16}/></button>
                  <button className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg"><ImageIcon size={16}/></button>
                  <button className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg"><Mic size={16}/></button>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] text-gray-400">{input.length} / 4000</span>
                  <button onClick={send} disabled={!input.trim()||sending} className={`p-2 rounded-xl ${input.trim()&&!sending?'bg-blue-600 text-white hover:bg-blue-700':'bg-gray-100 text-gray-300'}`}>
                    <ArrowUp size={16}/>
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-2 text-center text-[10px] text-gray-400">GenOS AI는 실수할 수 있습니다. 중요한 정보는 반드시 출처를 확인하세요.</div>
          </div>
        </div>
      </div>

      {/* Right rail: sources / agent info */}
      {showSources && (
        <div className="w-80 border-l bg-white shrink-0 flex flex-col">
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className="font-bold text-sm flex items-center"><BookOpen size={14} className="mr-1.5 text-blue-600"/>참고 자료</h3>
            <button onClick={()=>setShowSources(false)} className="p-1 text-gray-400 hover:bg-gray-100 rounded"><PanelRightClose size={14}/></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <div className="bg-blue-50 rounded-xl p-3">
              <div className="text-[11px] font-bold text-blue-700 mb-1">에이전트 정보</div>
              <div className="text-xs text-blue-900 leading-relaxed">{agent.desc}</div>
              <div className="mt-2 flex items-center justify-between text-[10px] text-blue-700">
                <span className="flex items-center"><Star size={10} className="text-yellow-500 fill-yellow-400 mr-0.5"/>{agent.rating}/5.0</span>
                <span>{agent.calls}회 사용</span>
              </div>
            </div>
            {msgs.find(m=>m.sources)?.sources?.map((s,i)=>(
              <div key={i} className="border rounded-xl p-3 hover:border-blue-300 cursor-pointer">
                <div className="flex items-start space-x-2 mb-2">
                  <FileText size={14} className="text-gray-400 shrink-0 mt-0.5"/>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-medium truncate">{s.title}</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">페이지 {s.page} · 유사도 {(s.score*100).toFixed(0)}%</div>
                  </div>
                </div>
                <div className="text-[11px] text-gray-600 bg-gray-50 rounded p-2 line-clamp-3">{s.chunk}</div>
                <button onClick={()=>toast('원본 문서를 엽니다','info')} className="mt-2 text-[10px] text-blue-600 hover:underline flex items-center"><ExternalLink size={10} className="mr-0.5"/>원본 열기</button>
              </div>
            ))}
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="text-[11px] font-bold text-gray-700 mb-2">활성 도구</div>
              <div className="space-y-1">
                {Object.entries(tools).filter(([,v])=>v).map(([k])=>(
                  <div key={k} className="text-xs flex items-center"><Check size={10} className="text-green-600 mr-1"/>{k==='rag'?'지식 참조 (RAG)':k==='web'?'웹 검색':k==='code'?'코드 실행':'이미지 분석'}</div>
                ))}
                {Object.values(tools).every(v=>!v)&&<div className="text-xs text-gray-400">활성화된 도구가 없습니다</div>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ServiceAgentStore = ({onStartChat}) => {
  const toast=useToast();
  const [cat,setCat]=useState('all');
  const [search,setSearch]=useState('');
  const [sort,setSort]=useState('popular');
  const [favs,setFavs]=useState(new Set(SERVICE_FEATURED_AGENTS.filter(a=>a.pinned).map(a=>a.id)));
  const filtered=SERVICE_FEATURED_AGENTS.filter(a=>(cat==='all'||a.cat===cat)&&(!search||a.name.includes(search)||a.desc.includes(search)));
  const sorted=[...filtered].sort((a,b)=>sort==='popular'?b.calls-a.calls:sort==='rating'?b.rating-a.rating:a.name.localeCompare(b.name));
  const toggleFav=id=>setFavs(p=>{const n=new Set(p);n.has(id)?n.delete(id):n.add(id);return n;});
  return (
    <ServicePageShell>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">에이전트 스토어</h1>
        <p className="text-sm text-gray-500">업무에 맞는 AI 에이전트를 골라 바로 사용하세요</p>
      </div>

      {/* Featured banner */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {SERVICE_FEATURED_AGENTS.slice(0,3).map(a=>(
          <div key={a.id} className={`relative overflow-hidden rounded-2xl p-5 text-white bg-gradient-to-br ${a.iconBg} shadow-md hover:shadow-lg transition-all cursor-pointer`} onClick={()=>onStartChat('',a)}>
            <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-white/10 blur-2xl"/>
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <Bot size={28}/>
                <span className="bg-white/20 backdrop-blur px-2 py-0.5 rounded text-[10px] font-bold">{a.badge||'추천'}</span>
              </div>
              <div className="font-bold text-lg mb-1">{a.name}</div>
              <div className="text-xs opacity-90 line-clamp-2 mb-3">{a.desc}</div>
              <div className="flex items-center justify-between text-[11px] opacity-90">
                <span className="flex items-center"><Star size={10} className="fill-current mr-1"/>{a.rating}</span>
                <span>{a.calls}회 사용</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center space-x-1.5 overflow-x-auto">
          {SERVICE_AGENT_CATEGORIES.map(c=>(
            <button key={c.id} onClick={()=>setCat(c.id)} className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border ${cat===c.id?'bg-blue-600 text-white border-blue-600':'bg-white text-gray-600 hover:bg-gray-50'}`}>
              {c.label} <span className="opacity-70">({c.count})</span>
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-2 ml-3">
          <div className="relative"><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="에이전트 검색..." className="pl-8 pr-3 py-1.5 border rounded-lg text-xs w-60"/><Search size={12} className="absolute left-2.5 top-2.5 text-gray-400"/></div>
          <select value={sort} onChange={e=>setSort(e.target.value)} className="px-2 py-1.5 border rounded-lg text-xs bg-white">
            <option value="popular">인기순</option><option value="rating">평점순</option><option value="name">이름순</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-4">
        {sorted.map(a=>(
          <div key={a.id} className="bg-white rounded-2xl border p-5 hover:border-blue-400 hover:shadow-lg transition-all group">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${a.iconBg} flex items-center justify-center text-white shadow-sm`}><Bot size={20}/></div>
              <div className="flex items-center space-x-1">
                {a.badge&&<span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-1.5 py-0.5 rounded">{a.badge}</span>}
                <button onClick={()=>toggleFav(a.id)} className="text-gray-300 hover:text-yellow-500"><Star size={16} className={favs.has(a.id)?'fill-yellow-400 text-yellow-500':''}/></button>
              </div>
            </div>
            <div className="font-bold text-sm mb-1">{a.name}</div>
            <div className="text-xs text-gray-500 mb-3 line-clamp-2 min-h-[2.5rem]">{a.desc}</div>
            <div className="flex items-center justify-between text-[11px] text-gray-400 pb-3 mb-3 border-b">
              <span className="flex items-center"><Star size={10} className="text-yellow-500 fill-yellow-400 mr-0.5"/>{a.rating}</span>
              <span>{a.calls}회</span>
              <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded">{a.model}</span>
            </div>
            <button onClick={()=>onStartChat('',a)} className="w-full py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 flex items-center justify-center"><MessageSquare size={12} className="mr-1"/>사용하기</button>
          </div>
        ))}
      </div>
    </ServicePageShell>
  );
};

const ServiceMyKnowledge = ({onStartChat}) => {
  const toast=useToast();
  const [kas,setKas]=useState(MOCK_PERSONAL_KA);
  const [selKa,setSelKa]=useState(null);
  const [drag,setDrag]=useState(false);
  const totalDocs=kas.reduce((s,k)=>s+k.docs,0);
  const totalChunks=kas.reduce((s,k)=>s+k.chunks,0);
  return (
    <ServicePageShell>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">내 지식 영역</h1>
          <p className="text-sm text-gray-500">개인 문서를 업로드해 나만의 AI 어시스턴트와 대화하세요</p>
        </div>
        <button onClick={()=>toast('새 지식영역 생성 (데모)','info')} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center"><Plus size={14} className="mr-1.5"/>지식영역 생성</button>
      </div>

      {/* Drop zone */}
      <div onDragOver={e=>{e.preventDefault();setDrag(true);}} onDragLeave={()=>setDrag(false)} onDrop={e=>{e.preventDefault();setDrag(false);toast('문서가 업로드되었습니다 (데모)');}} className={`border-2 border-dashed rounded-2xl p-8 mb-6 text-center transition-all cursor-pointer ${drag?'border-blue-500 bg-blue-50':'border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50/30'}`}>
        <UploadCloud size={40} className={`mx-auto mb-3 ${drag?'text-blue-600':'text-gray-400'}`}/>
        <div className="font-bold text-gray-800 mb-1">PDF, DOCX, XLSX, PPTX, TXT 파일을 끌어다 놓으세요</div>
        <div className="text-xs text-gray-500 mb-3">최대 100MB / 파일당, 1회 업로드 시 최대 20개 파일</div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">파일 선택</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          {l:'지식영역',v:kas.length,sub:'개인 KA',c:'border-blue-500 text-blue-700 bg-blue-50',icon:FolderTree},
          {l:'총 문서',v:totalDocs,sub:'업로드 됨',c:'border-green-500 text-green-700 bg-green-50',icon:FileText},
          {l:'총 청크',v:totalChunks.toLocaleString(),sub:'벡터 임베딩',c:'border-purple-500 text-purple-700 bg-purple-50',icon:Database},
          {l:'질의 가능',v:'237 GB',sub:'잔여 용량',c:'border-orange-500 text-orange-700 bg-orange-50',icon:HardDrive},
        ].map((s,i)=>(
          <div key={i} className={`p-4 rounded-xl border-l-4 bg-white shadow-sm ${s.c.split(' ')[0]}`}>
            <div className="flex items-center justify-between mb-1.5"><span className="text-xs text-gray-500">{s.l}</span><s.icon size={14} className="text-gray-300"/></div>
            <div className={`text-xl font-bold ${s.c.split(' ')[1]}`}>{s.v}</div>
            <div className="text-[10px] text-gray-400 mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* KA grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {kas.map(k=>(
          <div key={k.id} className="bg-white rounded-2xl border p-5 hover:border-blue-400 hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-sm"><FolderTree size={20}/></div>
              <div className="flex items-center space-x-1">
                {k.shared&&<span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-1.5 py-0.5 rounded">팀 공유</span>}
                <StatusBadge status={k.status}/>
              </div>
            </div>
            <div className="font-bold text-sm mb-2">{k.name}</div>
            <div className="grid grid-cols-3 gap-2 mb-3 text-center">
              <div className="bg-gray-50 rounded-lg p-2"><div className="text-sm font-bold">{k.docs}</div><div className="text-[9px] text-gray-400">문서</div></div>
              <div className="bg-gray-50 rounded-lg p-2"><div className="text-sm font-bold">{k.chunks.toLocaleString()}</div><div className="text-[9px] text-gray-400">청크</div></div>
              <div className="bg-gray-50 rounded-lg p-2"><div className="text-sm font-bold">{k.size}</div><div className="text-[9px] text-gray-400">용량</div></div>
            </div>
            <div className="text-[10px] text-gray-400 mb-3">최종 업데이트: {k.updated}</div>
            <div className="flex space-x-2">
              <button onClick={()=>onStartChat(`'${k.name}' 지식영역에서 검색`)} className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 flex items-center justify-center"><MessageSquare size={11} className="mr-1"/>대화하기</button>
              <button onClick={()=>setSelKa(k)} className="px-3 py-2 border rounded-lg text-xs font-medium hover:bg-gray-50">관리</button>
            </div>
          </div>
        ))}
      </div>

      {/* Recent docs */}
      <div className="bg-white rounded-2xl border overflow-hidden">
        <div className="px-5 py-3 border-b flex items-center justify-between">
          <h3 className="font-bold text-sm flex items-center"><History size={14} className="mr-1.5 text-gray-500"/>최근 업로드</h3>
          <input placeholder="문서 검색..." className="px-3 py-1 border rounded-lg text-xs w-48"/>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50/50 text-[11px] text-gray-400"><tr>
            <th className="px-5 py-2.5 text-left font-medium">파일명</th>
            <th className="px-5 py-2.5 text-left font-medium">크기</th>
            <th className="px-5 py-2.5 text-left font-medium">청크</th>
            <th className="px-5 py-2.5 text-left font-medium">업로드일</th>
            <th className="px-5 py-2.5 text-left font-medium">상태</th>
            <th className="px-5 py-2.5 text-center font-medium"></th>
          </tr></thead>
          <tbody className="divide-y">
            {MOCK_KA_DOCS.map((d,i)=>(
              <tr key={i} className="hover:bg-gray-50/50">
                <td className="px-5 py-2.5"><div className="flex items-center space-x-2"><FileText size={14} className="text-gray-400"/><span className="font-medium truncate max-w-xs">{d.name}</span></div></td>
                <td className="px-5 py-2.5 text-xs text-gray-500">{d.size}</td>
                <td className="px-5 py-2.5 text-xs text-gray-500">{d.chunks}</td>
                <td className="px-5 py-2.5 text-xs text-gray-400">{d.date}</td>
                <td className="px-5 py-2.5"><span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${d.status==='Indexed'?'bg-green-50 text-green-700':'bg-blue-50 text-blue-700 animate-pulse'}`}>{d.status}</span></td>
                <td className="px-5 py-2.5 text-center"><button onClick={()=>toast('다운로드합니다','info')} className="text-gray-400 hover:text-blue-600"><Download size={12}/></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ServicePageShell>
  );
};

const ServiceReportWriter = () => {
  const toast=useToast();
  const [template,setTemplate]=useState(null);
  const [step,setStep]=useState(0);
  const [title,setTitle]=useState('');
  const [source,setSource]=useState('');
  const [tone,setTone]=useState('공식적');
  const [length,setLength]=useState('보통');
  const [generating,setGenerating]=useState(false);
  const [generated,setGenerated]=useState(false);
  const startGen=()=>{
    setGenerating(true);setStep(3);
    setTimeout(()=>{setGenerating(false);setGenerated(true);toast('보고서가 생성되었습니다');},2500);
  };
  const reset=()=>{setTemplate(null);setStep(0);setTitle('');setSource('');setGenerated(false);};
  if(!template){
    return (
      <ServicePageShell>
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">보고서 작성</h1>
          <p className="text-sm text-gray-500">템플릿을 선택하고 자료를 입력하면 AI가 보고서 초안을 작성해드립니다</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {SERVICE_REPORT_TEMPLATES.map(t=>(
            <div key={t.id} onClick={()=>{setTemplate(t);setStep(1);}} className="bg-white rounded-2xl border-2 border-transparent p-5 hover:border-blue-400 hover:shadow-lg cursor-pointer transition-all group">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${t.color} flex items-center justify-center text-white mb-4 shadow-md group-hover:scale-110 transition-transform`}><t.icon size={24}/></div>
              <div className="font-bold mb-1">{t.name}</div>
              <div className="text-xs text-gray-500 mb-4 line-clamp-2 min-h-[2rem]">{t.desc}</div>
              <div className="space-y-1 mb-4">
                {t.sections.map((s,i)=>(
                  <div key={i} className="flex items-center text-[11px] text-gray-600"><Check size={10} className="text-green-500 mr-1.5"/>{s}</div>
                ))}
              </div>
              <div className="flex items-center justify-between pt-3 border-t text-[11px] text-gray-400">
                <span className="flex items-center"><Clock size={10} className="mr-1"/>약 {t.time}</span>
                <span>{t.uses}회 사용</span>
              </div>
            </div>
          ))}
        </div>
      </ServicePageShell>
    );
  }
  return (
    <ServicePageShell>
      <div className="mb-5 flex items-center space-x-3">
        <button onClick={reset} className="p-2 hover:bg-gray-100 rounded-lg"><ArrowLeft size={16}/></button>
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${template.color} flex items-center justify-center text-white`}><template.icon size={18}/></div>
        <div>
          <div className="font-bold">{template.name}</div>
          <div className="text-xs text-gray-500">{template.desc}</div>
        </div>
      </div>
      <div className="flex items-center justify-center space-x-4 mb-6">
        {['템플릿','자료/옵션','생성 결과'].map((l,i)=>(
          <div key={l} className="flex items-center">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step>i?'bg-green-500 text-white':step===i?'bg-blue-600 text-white ring-4 ring-blue-100':'bg-gray-200 text-gray-400'}`}>{step>i?<Check size={12}/>:i+1}</div>
            <span className={`ml-2 text-xs font-medium ${step>=i?'text-gray-800':'text-gray-400'}`}>{l}</span>
            {i<2&&<div className={`w-12 h-0.5 mx-3 ${step>i?'bg-green-500':'bg-gray-200'}`}/>}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-6">
        {/* Form */}
        <div className="bg-white rounded-2xl border p-6">
          <h3 className="font-bold text-sm mb-4">자료 및 옵션</h3>
          <div className="space-y-4">
            <div><label className="text-xs font-medium text-gray-700 block mb-1">보고서 제목</label>
              <input value={title} onChange={e=>setTitle(e.target.value)} placeholder={`예: 2026년 1분기 ${template.name}`} className="w-full px-3 py-2 border rounded-lg text-sm"/>
            </div>
            <div><label className="text-xs font-medium text-gray-700 block mb-1">자료 / 참고 정보</label>
              <textarea value={source} onChange={e=>setSource(e.target.value)} rows={5} placeholder="자료의 핵심 내용을 붙여넣거나, 아래에서 파일을 첨부하세요" className="w-full px-3 py-2 border rounded-lg text-sm"/>
              <div className="mt-2 border-2 border-dashed rounded-lg p-3 text-center text-xs text-gray-400 hover:border-blue-400 cursor-pointer"><Paperclip size={12} className="inline mr-1"/>파일 첨부 또는 KA에서 가져오기</div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="text-xs font-medium text-gray-700 block mb-1">어조</label>
                <select value={tone} onChange={e=>setTone(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm bg-white">
                  <option>공식적</option><option>친근한</option><option>간결한</option><option>설명적</option>
                </select>
              </div>
              <div><label className="text-xs font-medium text-gray-700 block mb-1">분량</label>
                <select value={length} onChange={e=>setLength(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm bg-white">
                  <option>간단 (1-2p)</option><option>보통</option><option>상세 (5-7p)</option><option>심층 (10p+)</option>
                </select>
              </div>
            </div>
            <div><label className="text-xs font-medium text-gray-700 block mb-1">포함 섹션</label>
              <div className="grid grid-cols-2 gap-2">
                {template.sections.map((s,i)=>(
                  <label key={i} className="flex items-center text-xs bg-gray-50 rounded-lg px-3 py-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="mr-2 accent-blue-600"/>{s}
                  </label>
                ))}
              </div>
            </div>
            <button onClick={startGen} disabled={!title} className={`w-full py-3 rounded-xl text-sm font-bold ${title?'bg-blue-600 text-white hover:bg-blue-700':'bg-gray-200 text-gray-400'}`}>
              <Sparkles size={14} className="inline mr-1.5"/>보고서 생성하기
            </button>
          </div>
        </div>
        {/* Preview */}
        <div className="bg-white rounded-2xl border p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sm flex items-center"><Eye size={14} className="mr-1.5 text-gray-500"/>실시간 미리보기</h3>
            {generated&&<div className="flex space-x-1">
              <button onClick={()=>toast('Word 파일로 내보냅니다','info')} className="px-2 py-1 border rounded text-[11px] font-medium hover:bg-gray-50">DOCX</button>
              <button onClick={()=>toast('PDF 파일로 내보냅니다','info')} className="px-2 py-1 border rounded text-[11px] font-medium hover:bg-gray-50">PDF</button>
              <button onClick={()=>toast('인쇄','info')} className="p-1 border rounded hover:bg-gray-50"><Copy size={12}/></button>
            </div>}
          </div>
          <div className="bg-gradient-to-b from-gray-50 to-white border rounded-xl p-5 min-h-[400px] text-sm">
            {generating?(
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"/>
                <div className="font-bold mb-1">보고서를 생성하고 있어요...</div>
                <div className="text-xs text-gray-500">자료 분석 → 구조 설계 → 본문 작성</div>
              </div>
            ):generated?(
              <div className="space-y-3 animate-in">
                <div className="text-center pb-3 border-b">
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider">{template.name}</div>
                  <div className="font-bold text-lg mt-1">{title}</div>
                  <div className="text-[11px] text-gray-500 mt-1">작성: 김영빈 · 2026-05-17</div>
                </div>
                {template.sections.map((s,i)=>(
                  <div key={i}>
                    <div className="font-bold text-sm mb-1.5">{i+1}. {s}</div>
                    <div className="text-xs text-gray-600 leading-relaxed bg-gray-50 rounded p-2">
                      {i===0&&`본 보고서는 ${title}의 ${s}에 관한 내용을 다룹니다. 분석 대상 기간 동안의 주요 변동 사항과 핵심 지표를 정리하였으며, 향후 의사결정을 위한 시사점을 도출하였습니다.`}
                      {i===1&&`주요 결과는 다음과 같습니다. 첫째, 핵심 KPI는 목표 대비 108% 달성하였습니다. 둘째, 신규 발견된 이슈는 총 3건이며 모두 경미한 수준입니다. 셋째, 다음 단계 권고 사항을 제시합니다.`}
                      {i>=2&&`해당 섹션의 상세 내용이 AI에 의해 자동으로 작성됩니다. 사용자가 제공한 자료의 핵심 정보를 토대로 ${tone} 어조에 맞춰 ${length} 분량으로 구성됩니다.`}
                    </div>
                  </div>
                ))}
              </div>
            ):(
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <FileText size={48} className="mb-3"/>
                <div className="text-sm font-medium">왼쪽 폼을 작성하고</div>
                <div className="text-xs mt-1">"보고서 생성하기" 버튼을 눌러주세요</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ServicePageShell>
  );
};

const ServiceDataAnalysis = () => {
  const toast=useToast();
  const [hasData,setHasData]=useState(true);
  const [aiMsg,setAiMsg]=useState('');
  const [chartType,setChartType]=useState('bar');
  const [insights,setInsights]=useState([
    {type:'warning',title:'압력 이상치 발견',desc:'LNG-T-01 설비에서 1.12 MPa (정상 범위 0.7-0.95) 측정',icon:AlertTriangle},
    {type:'trend',title:'온도 안정적 유지',desc:'평균 -158.2°C, 표준편차 6.4°C로 안정적',icon:TrendingUp},
    {type:'info',title:'점검 빈도 적정',desc:'2주간 5회 점검, 권장 주기 충족',icon:CheckCircle},
  ]);
  return (
    <ServicePageShell>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">데이터 분석</h1>
          <p className="text-sm text-gray-500">데이터를 업로드하면 AI가 자동으로 분석하고 시각화합니다</p>
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={()=>setHasData(false)} className="px-3 py-2 border rounded-lg text-sm hover:bg-gray-50 flex items-center"><UploadCloud size={14} className="mr-1.5"/>새 데이터</button>
          <button onClick={()=>toast('보고서로 변환합니다','info')} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center"><FileText size={14} className="mr-1.5"/>보고서로 변환</button>
        </div>
      </div>

      {!hasData?(
        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-16 text-center bg-white">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 flex items-center justify-center mb-4"><UploadCloud size={32} className="text-blue-600"/></div>
          <h3 className="font-bold mb-1">데이터 파일을 업로드하세요</h3>
          <p className="text-xs text-gray-500 mb-4">CSV, Excel, JSON, Parquet · 최대 50MB</p>
          <button onClick={()=>{setHasData(true);toast('샘플 데이터로 분석을 시작합니다','info');}} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">파일 선택</button>
          <div className="mt-4 text-xs text-gray-400">또는 <button onClick={()=>setHasData(true)} className="text-blue-600 hover:underline">샘플 데이터로 시작</button></div>
        </div>
      ):(
        <>
          {/* Data preview */}
          <div className="bg-white rounded-2xl border overflow-hidden mb-5">
            <div className="px-5 py-3 bg-gray-50/80 border-b flex items-center justify-between">
              <h3 className="font-bold text-sm flex items-center"><FileSpreadsheet size={14} className="mr-1.5 text-emerald-600"/>설비_점검_2026Q1.csv <span className="ml-2 text-[10px] text-gray-400 font-normal">5행 × 5열 (전체 124행)</span></h3>
              <div className="flex items-center space-x-1">
                <button onClick={()=>toast('전체 데이터를 봅니다','info')} className="text-xs text-blue-600 hover:underline">전체 보기</button>
              </div>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-white text-[11px] text-gray-500"><tr>{SERVICE_SAMPLE_DATA.map((c,i)=>(<th key={i} className="px-4 py-2 text-left font-bold border-b">{c.col}</th>))}</tr></thead>
              <tbody className="divide-y">
                {SERVICE_SAMPLE_DATA[0].vals.map((_,r)=>(
                  <tr key={r} className="hover:bg-gray-50/50">
                    {SERVICE_SAMPLE_DATA.map((c,i)=>(
                      <td key={i} className={`px-4 py-2 text-xs ${c.col==='결과'&&c.vals[r]==='이상'?'text-red-600 font-bold':''}`}>{c.vals[r]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Stats + Chart + Insights */}
          <div className="grid grid-cols-3 gap-5 mb-5">
            <div className="col-span-2 bg-white rounded-2xl border p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-sm">자동 시각화</h3>
                <div className="flex items-center space-x-1">
                  {[['bar',BarChart3],['line',LineChart],['pie',PieChart]].map(([k,Ic])=>(
                    <button key={k} onClick={()=>setChartType(k)} className={`p-1.5 rounded-lg ${chartType===k?'bg-blue-50 text-blue-600':'text-gray-400 hover:bg-gray-100'}`}><Ic size={14}/></button>
                  ))}
                </div>
              </div>
              {/* Chart placeholder */}
              <div className="h-64 flex items-end space-x-3 px-4">
                {[{l:'1주',v:24,c:'bg-blue-500'},{l:'2주',v:38,c:'bg-blue-500'},{l:'3주',v:52,c:'bg-blue-500'},{l:'4주',v:42,c:'bg-blue-500'},{l:'5주',v:65,c:'bg-orange-500'},{l:'6주',v:48,c:'bg-blue-500'}].map((b,i)=>(
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <div className={`w-full ${b.c} rounded-t-md transition-all hover:opacity-80`} style={{height:`${b.v}%`}}/>
                    <div className="text-[10px] text-gray-500 mt-1.5 font-medium">{b.l}</div>
                    <div className="text-[10px] text-gray-400">{b.v}건</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t grid grid-cols-4 gap-3 text-center">
                <div><div className="text-xs text-gray-400">평균</div><div className="font-bold text-blue-700">44.8</div></div>
                <div><div className="text-xs text-gray-400">중앙값</div><div className="font-bold text-blue-700">45.0</div></div>
                <div><div className="text-xs text-gray-400">표준편차</div><div className="font-bold text-blue-700">14.2</div></div>
                <div><div className="text-xs text-gray-400">이상치</div><div className="font-bold text-orange-600">1건</div></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-white rounded-2xl border p-5">
                <h3 className="font-bold text-sm mb-3 flex items-center"><Sparkles size={14} className="mr-1.5 text-purple-600"/>AI 인사이트</h3>
                <div className="space-y-2.5">
                  {insights.map((insight,i)=>(
                    <div key={i} className={`p-3 rounded-lg border-l-4 ${insight.type==='warning'?'bg-orange-50 border-orange-500':insight.type==='trend'?'bg-blue-50 border-blue-500':'bg-green-50 border-green-500'}`}>
                      <div className="flex items-center space-x-1.5 mb-1"><insight.icon size={12} className={insight.type==='warning'?'text-orange-600':insight.type==='trend'?'text-blue-600':'text-green-600'}/><span className="text-xs font-bold">{insight.title}</span></div>
                      <div className="text-[11px] text-gray-600">{insight.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Q&A */}
          <div className="bg-white rounded-2xl border p-5">
            <h3 className="font-bold text-sm mb-3 flex items-center"><MessageSquare size={14} className="mr-1.5 text-blue-600"/>데이터에 질문하기</h3>
            <div className="space-y-2 mb-3">
              {[
                '이상치가 발생한 설비는 어디인가요?',
                '월별 점검 빈도 추이를 알려주세요',
                '압력 데이터 분포는 어떻게 되나요?',
                '향후 1개월 예측 그래프를 그려주세요',
              ].map((q,i)=>(
                <button key={i} onClick={()=>setAiMsg(q)} className="w-full text-left px-3 py-2 border rounded-lg text-xs hover:bg-blue-50 hover:border-blue-300">💬 {q}</button>
              ))}
            </div>
            <div className="flex items-center space-x-2 pt-3 border-t">
              <input value={aiMsg} onChange={e=>setAiMsg(e.target.value)} placeholder="데이터에 대해 무엇이든 질문하세요" className="flex-1 px-3 py-2 border rounded-lg text-sm"/>
              <button onClick={()=>{if(aiMsg)toast(`"${aiMsg}" 분석 중...`,'info');}} className="bg-blue-600 text-white p-2.5 rounded-lg hover:bg-blue-700"><ArrowUp size={14}/></button>
            </div>
          </div>
        </>
      )}
    </ServicePageShell>
  );
};

const ServiceImageGen = () => {
  const toast=useToast();
  const [prompt,setPrompt]=useState('');
  const [style,setStyle]=useState('photo');
  const [ratio,setRatio]=useState('16:9');
  const [quality,setQuality]=useState('high');
  const [generating,setGenerating]=useState(false);
  const [generated,setGenerated]=useState(null);
  const generate=()=>{
    if(!prompt.trim()){toast('프롬프트를 입력해주세요','warning');return;}
    setGenerating(true);setGenerated(null);
    setTimeout(()=>{
      const st=SERVICE_IMAGE_STYLES.find(s=>s.id===style);
      setGenerated({prompt,style,ratio,gradient:st.sample});
      setGenerating(false);
      toast('이미지가 생성되었습니다');
    },1800);
  };
  return (
    <ServicePageShell>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">이미지 생성</h1>
        <p className="text-sm text-gray-500">설명을 입력하면 AI가 이미지를 만들어드립니다</p>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {/* Form */}
        <div className="col-span-1 bg-white rounded-2xl border p-5 space-y-4 h-fit">
          <div><label className="text-xs font-bold text-gray-700 block mb-1.5">프롬프트</label>
            <textarea value={prompt} onChange={e=>setPrompt(e.target.value)} rows={4} placeholder="원하는 이미지를 자세히 설명해주세요&#10;예: 안전모를 쓴 엔지니어가 LNG 저장탱크를 점검하는 모습, 일러스트 풍" className="w-full px-3 py-2 border rounded-lg text-sm"/>
          </div>
          <div><label className="text-xs font-bold text-gray-700 block mb-1.5">스타일</label>
            <div className="grid grid-cols-3 gap-2">
              {SERVICE_IMAGE_STYLES.map(s=>(
                <button key={s.id} onClick={()=>setStyle(s.id)} className={`p-2 rounded-lg border-2 text-center hover:scale-105 transition-transform ${style===s.id?'border-blue-500 ring-2 ring-blue-200':'border-gray-200'}`}>
                  <div className={`w-full h-14 rounded bg-gradient-to-br ${s.sample} mb-1.5`}/>
                  <div className="text-[11px] font-bold">{s.name}</div>
                  <div className="text-[9px] text-gray-400">{s.desc}</div>
                </button>
              ))}
            </div>
          </div>
          <div><label className="text-xs font-bold text-gray-700 block mb-1.5">비율</label>
            <div className="flex space-x-2">
              {['1:1','4:3','16:9','9:16'].map(r=>(
                <button key={r} onClick={()=>setRatio(r)} className={`flex-1 px-2 py-1.5 border rounded-lg text-xs font-medium ${ratio===r?'bg-blue-50 border-blue-500 text-blue-700':'hover:bg-gray-50'}`}>{r}</button>
              ))}
            </div>
          </div>
          <div><label className="text-xs font-bold text-gray-700 block mb-1.5">품질</label>
            <div className="flex space-x-2">
              {[['fast','빠름','512px'],['high','고품질','1024px'],['ultra','초고품질','2048px']].map(([k,l,d])=>(
                <button key={k} onClick={()=>setQuality(k)} className={`flex-1 px-2 py-2 border rounded-lg ${quality===k?'bg-blue-50 border-blue-500':'hover:bg-gray-50'}`}>
                  <div className="text-xs font-bold">{l}</div>
                  <div className="text-[10px] text-gray-400">{d}</div>
                </button>
              ))}
            </div>
          </div>
          <button onClick={generate} disabled={generating} className={`w-full py-3 rounded-xl text-sm font-bold ${generating?'bg-gray-200 text-gray-400':'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90'}`}>
            {generating?<><RefreshCw size={14} className="inline mr-1.5 animate-spin"/>생성 중...</>:<><Sparkles size={14} className="inline mr-1.5"/>이미지 생성</>}
          </button>
        </div>
        {/* Preview */}
        <div className="col-span-2">
          <div className="bg-white rounded-2xl border p-5 mb-5">
            <h3 className="font-bold text-sm mb-3">미리보기</h3>
            <div className={`relative w-full bg-gray-100 rounded-xl overflow-hidden ${ratio==='1:1'?'aspect-square':ratio==='4:3'?'aspect-[4/3]':ratio==='16:9'?'aspect-video':'aspect-[9/16] max-w-xs mx-auto'}`}>
              {generating?(
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse">
                  <Sparkles size={40} className="text-gray-400 mb-2 animate-pulse"/>
                  <div className="text-xs text-gray-500">생성 중...</div>
                </div>
              ):generated?(
                <div className={`absolute inset-0 bg-gradient-to-br ${generated.gradient} flex items-center justify-center text-white`}>
                  <div className="text-center p-4">
                    <Camera size={32} className="mx-auto mb-2 opacity-80"/>
                    <div className="text-xs opacity-90 line-clamp-3 max-w-xs">{generated.prompt}</div>
                  </div>
                  <div className="absolute bottom-3 right-3 flex space-x-1">
                    <button onClick={()=>toast('다운로드합니다')} className="p-1.5 bg-white/20 backdrop-blur rounded-lg hover:bg-white/30"><Download size={12}/></button>
                    <button onClick={()=>toast('재생성합니다','info')} className="p-1.5 bg-white/20 backdrop-blur rounded-lg hover:bg-white/30"><RefreshCw size={12}/></button>
                    <button onClick={()=>toast('보관함에 저장','info')} className="p-1.5 bg-white/20 backdrop-blur rounded-lg hover:bg-white/30"><Bookmark size={12}/></button>
                  </div>
                </div>
              ):(
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                  <ImageIcon size={40} className="mb-2"/>
                  <div className="text-xs">왼쪽에서 프롬프트를 입력하세요</div>
                </div>
              )}
            </div>
          </div>
          <div>
            <h3 className="font-bold text-sm mb-3 flex items-center"><History size={14} className="mr-1.5 text-purple-600"/>최근 생성</h3>
            <div className="grid grid-cols-3 gap-3">
              {SERVICE_RECENT_IMAGES.map(img=>(
                <div key={img.id} className="bg-white rounded-xl border overflow-hidden hover:shadow-md cursor-pointer group">
                  <div className={`aspect-square bg-gradient-to-br ${img.gradient} relative`}>
                    <div className="absolute inset-0 flex items-center justify-center text-white opacity-50"><ImageIcon size={28}/></div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex space-x-1 justify-end">
                        <button className="p-1 bg-white/20 backdrop-blur rounded text-white"><Download size={10}/></button>
                        <button className="p-1 bg-white/20 backdrop-blur rounded text-white"><Copy size={10}/></button>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <div className="text-[11px] font-medium line-clamp-2 mb-1">{img.prompt}</div>
                    <div className="flex items-center justify-between text-[9px] text-gray-400">
                      <span>{SERVICE_IMAGE_STYLES.find(s=>s.id===img.style)?.name}</span>
                      <span>{img.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ServicePageShell>
  );
};

const ServiceQuickTools = () => {
  const toast=useToast();
  const [tool,setTool]=useState('translate');
  const [input,setInput]=useState('');
  const [output,setOutput]=useState('');
  const [processing,setProcessing]=useState(false);
  const [opts,setOpts]=useState({from:'ko',to:'en',mailType:'협조 요청',summaryLen:'중간'});
  const run=()=>{
    if(!input.trim()){toast('내용을 입력해주세요','warning');return;}
    setProcessing(true);setOutput('');
    setTimeout(()=>{
      const samples={
        translate:`Subject: Inquiry about LNG Storage Tank Inspection Procedure\n\nDear Team,\n\nI would like to inquire about the regular inspection cycle and inspection items for LNG storage tanks. Could you please share the latest standards and check points?\n\nBest regards,\nKim Young-bin`,
        summary:`핵심 요약:\n• LNG 저장탱크는 매일 1회 일상점검, 매월 1회 정기점검, 6개월마다 정밀점검 수행\n• 안전밸브 설정압력은 설계압력의 110%\n• 4년마다 개방점검 시행\n• 안전관리법 제43조 위반 시 즉시 운영 중단 및 보수`,
        mail:`안녕하세요, 안전관리팀입니다.\n\n다름이 아니라 ${opts.mailType||'협조 요청'} 건으로 메일 드립니다. \n첨부 자료를 검토하시고 의견 부탁드립니다.\n\n바쁘신 와중에 검토해 주셔서 감사합니다.\n\n감사합니다.\n안전관리팀 김영빈 드림`,
        meeting:`📋 회의록\n\n● 일시: 2026-05-17 14:00-15:30\n● 안건: LNG 설비 점검 절차 개선\n\n결정 사항:\n  1. 정기점검 주기를 월 1회 → 월 2회로 변경\n  2. 디지털 체크리스트 시스템 도입\n\n액션 아이템:\n  • 김영빈: 점검 양식 개선안 (5/24까지)\n  • 이준호: 디지털 시스템 RFP 작성 (5/31까지)`,
        proofread:`수정된 문장:\n원문: "LNG저장탱크의 안전벨브 설정압력은 설계압력의 110% 입니다."\n수정: "LNG 저장탱크의 안전밸브 설정 압력은 설계 압력의 110%입니다."\n\n수정 사항:\n• "LNG저장탱크" → "LNG 저장탱크" (띄어쓰기)\n• "안전벨브" → "안전밸브" (맞춤법)\n• "110% 입니다" → "110%입니다" (조사 붙임)`,
        ideas:`💡 "사내 AI 도입 활성화" 아이디어\n\n1. 부서별 AI 챔피언 제도\n   - 부서당 1명 선정, 활용 사례 공유\n\n2. 월간 AI 사례 발표회\n   - 우수 사례 표창 및 인센티브\n\n3. 사내 AI 자격증 운영\n   - 초/중/고급 단계별 교육\n\n4. AI 활용 KPI 반영\n   - 업무 효율성 지표화\n\n5. 활용 사례 위키 구축\n   - 누구나 검색 가능한 노하우 DB`,
      };
      setOutput(samples[tool]||'결과가 생성되었습니다.');
      setProcessing(false);
    },900);
  };
  return (
    <ServicePageShell>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">간편 도구</h1>
        <p className="text-sm text-gray-500">자주 쓰는 AI 도구를 한 곳에서 빠르게</p>
      </div>
      {/* Tool tabs */}
      <div className="grid grid-cols-6 gap-2 mb-5">
        {SERVICE_QUICK_TOOLS.map(t=>(
          <button key={t.id} onClick={()=>{setTool(t.id);setInput('');setOutput('');}} className={`p-3 rounded-xl border-2 text-left transition-all ${tool===t.id?'border-blue-500 bg-blue-50':'border-gray-200 bg-white hover:border-blue-300'}`}>
            <div className={`w-8 h-8 rounded-lg ${t.color} flex items-center justify-center mb-2`}><t.icon size={14}/></div>
            <div className="font-bold text-xs">{t.name}</div>
            <div className="text-[10px] text-gray-500 line-clamp-1">{t.desc}</div>
          </button>
        ))}
      </div>

      {/* Tool-specific options */}
      {tool==='translate' && (
        <div className="bg-white rounded-2xl border p-4 mb-3 flex items-center space-x-3">
          <div className="text-xs font-medium text-gray-700">언어:</div>
          <select value={opts.from} onChange={e=>setOpts({...opts,from:e.target.value})} className="px-3 py-1.5 border rounded-lg text-xs bg-white"><option value="ko">한국어</option><option value="en">English</option><option value="ja">日本語</option><option value="zh">中文</option></select>
          <ArrowRight size={14} className="text-gray-400"/>
          <select value={opts.to} onChange={e=>setOpts({...opts,to:e.target.value})} className="px-3 py-1.5 border rounded-lg text-xs bg-white"><option value="en">English</option><option value="ko">한국어</option><option value="ja">日本語</option><option value="zh">中文</option></select>
          <button onClick={()=>setOpts({...opts,from:opts.to,to:opts.from})} className="p-1.5 hover:bg-gray-100 rounded-lg" title="언어 교환"><RotateCcw size={14}/></button>
        </div>
      )}
      {tool==='mail' && (
        <div className="bg-white rounded-2xl border p-4 mb-3 flex items-center space-x-3">
          <div className="text-xs font-medium text-gray-700">메일 유형:</div>
          {['협조 요청','감사','회신','일정 조율','문의'].map(t=>(
            <button key={t} onClick={()=>setOpts({...opts,mailType:t})} className={`px-3 py-1 rounded-lg text-xs ${opts.mailType===t?'bg-blue-600 text-white':'border hover:bg-gray-50'}`}>{t}</button>
          ))}
        </div>
      )}
      {tool==='summary' && (
        <div className="bg-white rounded-2xl border p-4 mb-3 flex items-center space-x-3">
          <div className="text-xs font-medium text-gray-700">요약 길이:</div>
          {['짧게','중간','상세'].map(l=>(
            <button key={l} onClick={()=>setOpts({...opts,summaryLen:l})} className={`px-3 py-1 rounded-lg text-xs ${opts.summaryLen===l?'bg-blue-600 text-white':'border hover:bg-gray-50'}`}>{l}</button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl border p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm">입력</h3>
            <button onClick={()=>setInput('')} className="text-xs text-gray-400 hover:text-gray-600">지우기</button>
          </div>
          <textarea value={input} onChange={e=>setInput(e.target.value)} rows={10} placeholder={tool==='translate'?'번역할 문장을 입력하세요':tool==='summary'?'요약할 글을 붙여넣으세요':tool==='mail'?'메일 작성에 필요한 핵심 정보를 입력하세요':tool==='meeting'?'회의 메모 또는 녹취록을 입력하세요':tool==='proofread'?'맞춤법을 검사할 문장을 입력하세요':'아이디어가 필요한 주제를 입력하세요'} className="w-full px-3 py-2 border rounded-lg text-sm"/>
          <div className="flex items-center justify-between mt-3">
            <span className="text-[10px] text-gray-400">{input.length}자</span>
            <button onClick={run} disabled={processing} className={`px-4 py-2 rounded-lg text-sm font-bold ${processing?'bg-gray-200 text-gray-400':'bg-blue-600 text-white hover:bg-blue-700'}`}>
              {processing?<><RefreshCw size={12} className="inline mr-1 animate-spin"/>처리 중</>:<><Sparkles size={12} className="inline mr-1"/>실행</>}
            </button>
          </div>
        </div>
        <div className="bg-white rounded-2xl border p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm">결과</h3>
            {output&&<div className="flex items-center space-x-1">
              <button onClick={()=>{navigator.clipboard?.writeText(output);toast('복사되었습니다');}} className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-blue-600"><Copy size={12}/></button>
              <button onClick={()=>toast('다운로드','info')} className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-blue-600"><Download size={12}/></button>
              <button onClick={run} className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-blue-600"><RotateCcw size={12}/></button>
            </div>}
          </div>
          <div className="bg-gray-50 rounded-lg p-3 min-h-[16rem] text-sm whitespace-pre-wrap leading-relaxed">
            {processing?<div className="flex space-x-1 mt-2"><div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"/><div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay:'0.2s'}}/><div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay:'0.4s'}}/></div>:output||<span className="text-gray-300">결과가 여기에 표시됩니다</span>}
          </div>
        </div>
      </div>
    </ServicePageShell>
  );
};

const ServiceHistory = ({onOpenChat}) => {
  const toast=useToast();
  const [search,setSearch]=useState('');
  const [filter,setFilter]=useState('all');
  const filtered=SERVICE_RECENT_CONVS.filter(c=>(!search||c.title.includes(search)||c.agent.includes(search))&&(filter==='all'||(filter==='pinned'&&c.pinned)));
  return (
    <ServicePageShell>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">대화 기록</h1>
        <p className="text-sm text-gray-500">지금까지 나눈 모든 대화를 검색하고 관리하세요</p>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          {[['all','전체',SERVICE_RECENT_CONVS.length],['pinned','고정',SERVICE_RECENT_CONVS.filter(c=>c.pinned).length]].map(([k,l,n])=>(
            <button key={k} onClick={()=>setFilter(k)} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${filter===k?'bg-blue-600 text-white':'bg-white border hover:bg-gray-50'}`}>{l} <span className="opacity-70">({n})</span></button>
          ))}
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative"><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="제목, 에이전트 검색..." className="pl-8 pr-3 py-1.5 border rounded-lg text-xs w-64"/><Search size={12} className="absolute left-2.5 top-2.5 text-gray-400"/></div>
          <button onClick={()=>toast('대화 기록을 내보냅니다','info')} className="px-3 py-1.5 border rounded-lg text-xs font-medium flex items-center"><Download size={12} className="mr-1"/>내보내기</button>
        </div>
      </div>
      <div className="bg-white rounded-2xl border divide-y overflow-hidden">
        {filtered.map(c=>(
          <div key={c.id} onClick={onOpenChat} className="px-5 py-4 hover:bg-gray-50/50 cursor-pointer">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center space-x-2 min-w-0">
                {c.pinned&&<Pin size={12} className="text-blue-500 shrink-0"/>}
                <span className="font-bold text-sm truncate">{c.title}</span>
                <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded shrink-0">{c.agent}</span>
              </div>
              <div className="flex items-center space-x-2 shrink-0">
                <span className="text-[10px] text-gray-400">{c.time}</span>
                <button onClick={e=>{e.stopPropagation();toast(c.pinned?'고정 해제됨':'고정되었습니다');}} className="p-1 text-gray-300 hover:text-blue-600">{c.pinned?<Pin size={12} className="fill-current text-blue-500"/>:<PinOff size={12}/>}</button>
                <button onClick={e=>{e.stopPropagation();toast('삭제되었습니다','warning');}} className="p-1 text-gray-300 hover:text-red-600"><Trash2 size={12}/></button>
              </div>
            </div>
            <div className="text-xs text-gray-500 line-clamp-1 pl-5">{c.preview}</div>
          </div>
        ))}
      </div>
    </ServicePageShell>
  );
};

// ==================== AI TOM (사용자 서비스 v2) ====================
const TOM_CONVERSATIONS = [
  {id:101,group:'today',pinned:true,title:'신규 프로젝트 온보딩 가이드',time:'방금 전',agent:'일반',preview:''},
  {id:102,group:'today',pinned:false,title:'데이터 분석 결과 정리',time:'10분 전',agent:'데이터 분석'},
  {id:103,group:'today',pinned:false,title:'2024년 4분기 보안 컴플라이언스 점검',time:'1시간 전',agent:'보안'},
  {id:104,group:'today',pinned:false,title:'React 핸드북 차세대 Lighthouse 점수',time:'2시간 전',agent:'기술'},
  {id:105,group:'today',pinned:false,title:'SSO 토큰 만료 일정',time:'3시간 전',agent:'보안'},
  {id:106,group:'week',pinned:false,title:'Python Pandas 시계열 멀티에이전트 테스트',time:'어제',agent:'기술'},
  {id:107,group:'week',pinned:false,title:'SSE 프로토콜 정리',time:'어제',agent:'기술'},
  {id:108,group:'week',pinned:false,title:'사내 기술 컨퍼런스 일정과 발표 명단 정리',time:'2일 전',agent:'일반'},
  {id:109,group:'week',pinned:false,title:'클라우드 인프라 보안 시 사례(IAM) 도큐 정리',time:'3일 전',agent:'보안'},
  {id:110,group:'week',pinned:false,title:'결재 API 도큐먼트 정해 변경 분석 분석',time:'4일 전',agent:'기술'},
  {id:111,group:'week',pinned:false,title:'Google OAuth 2.0 API 연동 절차 및 안...',time:'5일 전',agent:'기술'},
  {id:112,group:'old',pinned:false,title:'JVM 정확 검토 요청',time:'1주 전',agent:'기술'},
  {id:113,group:'old',pinned:false,title:'모델 변경 분석',time:'1주 전',agent:'데이터 분석'},
  {id:114,group:'old',pinned:false,title:'API 연동 일정 협의 메모...',time:'2주 전',agent:'일반'},
];

const TOM_AGENTS = [
  {id:'general',name:'일반 챗팅 업무 룬',desc:'사내 규정 가능, 기술 매뉴얼, 업무 지식에 대해 자유롭게 질문하세요.',color:'from-blue-500 to-indigo-600',badge:''},
  {id:'safety',name:'안전 점검 어시스턴트',desc:'PSV, BOG, LNG 저장탱크 등 설비 안전 점검 절차 안내',color:'from-red-500 to-rose-600',badge:'필수'},
  {id:'hr',name:'HR 도우미',desc:'연차, 복리후생, 인사 규정 관련 24시간 즉시 응답',color:'from-emerald-500 to-teal-600',badge:'인기'},
  {id:'legal',name:'법무·계약 어시스턴트',desc:'계약서 검토, 리스크 조항 식별, 법령 검색',color:'from-purple-500 to-fuchsia-600',badge:''},
  {id:'tech',name:'기술 매뉴얼 검색',desc:'설비 매뉴얼·도면·기술 사양 통합 검색',color:'from-cyan-500 to-blue-600',badge:''},
  {id:'finance',name:'재무·예산 분석',desc:'예산 집행, 전표 작성, 회계 규정',color:'from-amber-500 to-orange-600',badge:''},
  {id:'translate',name:'전문 번역',desc:'한↔영, 한↔일 기술 문서 번역 (용어집 자동 적용)',color:'from-pink-500 to-rose-500',badge:''},
  {id:'edu',name:'기술 교육 튜터',desc:'신입사원/기술직 교육용 단계별 설명',color:'from-orange-500 to-yellow-600',badge:''},
];

const TOM_GENERAL_PROMPTS = [
  {icon:Search,t:'지능형 질의-응답',desc:'최신 기술과 사내별 매뉴얼에 빠르게 답변',q:'PSV(안전밸브) 정기 점검 주기는 어떻게 되나요?'},
  {icon:FileText,t:'문서 요약 및 번역',desc:'어떤 길이의 PDF/문서도 한번에 핵심 추출, 번역도 함께',q:'첨부한 영문 매뉴얼을 한국어로 요약·번역해줘'},
  {icon:Link2,t:'ERP 연동',desc:'내 결재/업무 데이터를 ERP와 직접 호환',q:'이번 주 결재 대기 건과 미결 사항을 정리해줘'},
  {icon:Languages,t:'기술 번역',desc:'LNG 등 산업 용어를 정확히 한↔영 번역',q:'다음 영문 기술 매뉴얼을 한국어로 번역해줘'},
];

const TOM_SAMPLE_RESPONSES = {
  psv: {
    type:'rag',
    content:`**[RAG 기반 답변] — 출처: 평택기지_정비_지침.pdf**

평택기지 유지보수 지침서(제2장)에 따르면,

- **초저온 안전밸브(PSV)**: **1년 주기**로 분해 점검(Overhaul) 및 작동 시험(POP Test) 실시
- **BOG 벤팅 밸브**: **3년 주기**로 정밀 진단 수행

추가로 확인이 필요하시면 말씀해 주세요.`,
    sources:[
      {doc:'평택기지_정비_지침.pdf',page:4,similarity:95,excerpt:`[평택 LNG 생산기지 설비 유지보수 표준 지침]

제2장 주요 설비별 정비 주기

2.1 초저온 안전밸브 (PSV - Pressure Safety Valve)
- 초저온 안전밸브(PSV)는 관계 법령 및 사내 규정에 따라 1년 주기로 분해 점검 (Overhaul) 및 작동 시험(POP Test)을 실시하여야 한다.
- BOG 벤팅 밸브는 3년 주기로 정밀 진단을 수행한다.

제3장 안전 유의사항

3.1 작업 전 조치사항
- LNG 저장탱크 상부는 -162°C의 초저온...`,highlights:['1년 주기로 분해 점검 (Overhaul)','작동 시험(POP Test)','3년 주기로 정밀 진단']},
    ],
  },
  market: {
    type:'table',
    title:'"최근 기술전 임직원 만족경험 조사 시장 분석"',
    subtitle:'(2024년 기준, 글로벌 & 한국 시장 중심)',
    sectionTitle:'Executive Summary',
    table:{
      cols:['항목','내용'],
      rows:[
        ['시장 규모','2023년 전 세계 임직원 만족경험 조사(SG+HR Analytics) 시장 규모 ≈ USD 1.6B'],
        ['CAGR (2024-2028)','12.4 % (한국 대비 10.1%에서 1.1배)'],
        ['주요 성장 요인','- 하이브리드/원격 근무 확대 + 실시간 피드백 필요성 증가\n- AI/ML 기반 인사이트 도입\n- 기업 ESG/DEI 인덱스 통합 확대'],
        ['주요 도전 과제','- 데이터 프라이버시/개인정보 보호 (GDPR 등)\n- 설문 피로감(낮은 응답률)\n- 종합 결과 데이터 통합 곤란'],
        ['핵심 기회','- "Pulse Survey", "Micro-Survey" 서비스\n- HRIS, SAP/Workday/LinkedIn 등과의 API 연동\n- 한국 일/조직 문화 2.0세대(대화/매개) 신규 진출'],
      ],
    },
  },
  weekly: {
    type:'report',
    title:'주간 실적 보고서 초안 생성됨',
    subtitle:'정비기술처 주간 업무 실적 보고',
    steps:[
      {label:'표준 양식 불러오기',sub:'주간실적 보고서 사내 표준 템플릿 로드 완료',ok:true},
      {label:'정보 항목 매핑',sub:'입력 데이터를 자동 분류 완료',ok:true},
      {label:'공유용 개조식 포맷팅',sub:'보고서 양식에 맞게 최종 작성 완료',ok:true},
    ],
    preview:`**[주간 실적 보고서 초안 생성됨]**
**정비기술처 주간 업무 실적 보고**

| 구분 | 내용 |
|---|---|
| **보고 기간** | 2026. 02. 17.(월) ~ 02. 21.(금) |
| **작성 부서** | 정비기술처 |
| **작성자** | 김인훈 과장 |

**가. 주요 실적**
1. 초저온 안전밸브(PSV) 정기 점검: **5건 완료**
2. 배관 누설 탐지 처리: **2건 완료**

**나. 차주 계획**
- 6호기~10호기 PSV 정기 점검 예정

⚠ AI 생성 초안입니다. 반드시 확인 후 사용하세요.`,
    docTitle:'2026년 2월 4주차 주간 실적 보고',
    docSubtitle:'2026. 02. 26.',
  },
  greeting: {
    type:'plain',
    content:`안녕하세요! 무엇을 도와드릴까요? 사내 규정·매뉴얼 검색, 문서 요약·번역, 보고서 작성, 데이터 분석 등 다양한 업무를 지원합니다.\n\n좌측 사이드바에서 "에이전트" 탭을 누르면 안전 점검, HR, 법무 등 전문 어시스턴트도 선택할 수 있어요.`,
  },
};

const AITomChat = ({onSwitchToAdmin,onOpenMypage}) => {
  const toast=useToast();
  const [tab,setTab]=useState('general'); // 'general' | 'agent'
  const [activeAgent,setActiveAgent]=useState(TOM_AGENTS[0]);
  const [convs,setConvs]=useState(TOM_CONVERSATIONS);
  const [activeConvId,setActiveConvId]=useState(null);
  const [messages,setMessages]=useState([]);
  const [input,setInput]=useState('');
  const [sending,setSending]=useState(false);
  const [tools,setTools]=useState({rag:true,smartAuto:true});
  const [model,setModel]=useState('GPT-OSS');
  const [showRefs,setShowRefs]=useState(true);
  const [currentSources,setCurrentSources]=useState([]);
  const [search,setSearch]=useState('');
  const [favOpen,setFavOpen]=useState(true);
  const [showModelMenu,setShowModelMenu]=useState(false);
  const endRef=useRef(null);

  useEffect(()=>{endRef.current?.scrollIntoView({behavior:'smooth'});},[messages,sending]);

  const filtered=convs.filter(c=>!search||c.title.toLowerCase().includes(search.toLowerCase()));
  const todayConvs=filtered.filter(c=>c.group==='today'&&!c.pinned);
  const weekConvs=filtered.filter(c=>c.group==='week');
  const oldConvs=filtered.filter(c=>c.group==='old');
  const pinnedConvs=filtered.filter(c=>c.pinned);

  const detectResponseType=(text)=>{
    const lower=text.toLowerCase();
    if(/psv|안전밸브|점검 주기|정비 지침|평택|bog/i.test(lower))return 'psv';
    if(/시장|분석|규모|cagr|swot|impact|만족경험/i.test(lower))return 'market';
    if(/보고서|실적|주간|요약하여 작성|보고|보고해줘|작성해줘/i.test(lower))return 'weekly';
    return 'greeting';
  };

  const generate=(prompt,opts={})=>{
    const text=(prompt||'').trim();
    if(!text)return;
    const userMsg={role:'user',content:text,time:'방금 전'};
    setMessages(p=>[...p,userMsg]);
    setInput('');
    setSending(true);
    setTimeout(()=>{
      const kind=opts.kind||detectResponseType(text);
      const resp=TOM_SAMPLE_RESPONSES[kind]||TOM_SAMPLE_RESPONSES.greeting;
      const aiMsg={role:'assistant',time:'방금 전',data:resp};
      setMessages(p=>[...p,aiMsg]);
      if(resp.sources){setCurrentSources(resp.sources);setShowRefs(true);}
      setSending(false);
    },1200);
  };

  const send=()=>generate(input);

  const loadConv=(c)=>{
    setActiveConvId(c.id);
    setMessages([{role:'user',content:c.title,time:'1시간 전'},{role:'assistant',time:'1시간 전',data:TOM_SAMPLE_RESPONSES.greeting}]);
    setCurrentSources([]);
  };

  const newConv=()=>{
    setActiveConvId(null);
    setMessages([]);
    setCurrentSources([]);
    setShowRefs(true);
  };

  const togglePin=id=>{setConvs(p=>p.map(c=>c.id===id?{...c,pinned:!c.pinned}:c));toast('대화가 고정되었습니다','info');};
  const delConv=id=>{setConvs(p=>p.filter(c=>c.id!==id));toast('대화가 삭제되었습니다','warning');};

  // Render helpers
  const renderMarkdown=(text)=>{
    if(!text)return null;
    return text.split('\n').map((line,i)=>{
      if(line.startsWith('**')&&line.endsWith('**'))return <div key={i} className="font-bold my-1">{line.replace(/\*\*/g,'')}</div>;
      if(line.startsWith('- '))return <div key={i} className="ml-3 flex items-start text-[13px]"><span className="mr-1.5 text-gray-400 shrink-0">•</span><span dangerouslySetInnerHTML={{__html:line.slice(2).replace(/\*\*(.+?)\*\*/g,'<b>$1</b>')}}/></div>;
      if(/^\d+\./.test(line))return <div key={i} className="ml-3 flex items-start text-[13px]"><span className="mr-1.5 text-gray-500 shrink-0 font-medium">{line.match(/^\d+/)[0]}.</span><span dangerouslySetInnerHTML={{__html:line.replace(/^\d+\.\s*/,'').replace(/\*\*(.+?)\*\*/g,'<b>$1</b>')}}/></div>;
      if(line.trim()==='')return <div key={i} className="h-2"/>;
      return <div key={i} className="text-[13px] leading-relaxed" dangerouslySetInnerHTML={{__html:line.replace(/\*\*(.+?)\*\*/g,'<b>$1</b>')}}/>;
    });
  };

  const renderAssistant=(data)=>{
    if(!data)return null;
    if(data.type==='plain')return <div className="text-gray-800">{renderMarkdown(data.content)}</div>;
    if(data.type==='rag')return <div className="text-gray-800">{renderMarkdown(data.content)}</div>;
    if(data.type==='table')return (
      <div>
        <div className="flex items-center space-x-2 mb-1.5">
          <div className="w-6 h-6 rounded bg-blue-50 flex items-center justify-center text-blue-600"><FileBarChart size={13}/></div>
          <div className="font-bold text-[15px]">{data.title}</div>
        </div>
        <div className="text-xs text-gray-500 mb-3">{data.subtitle}</div>
        <div className="flex items-center mb-2"><div className="w-1 h-4 bg-blue-500 rounded mr-1.5"/><div className="font-bold text-sm">{data.sectionTitle}</div></div>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-[13px]">
            <thead className="bg-blue-50/70 text-blue-900"><tr>{data.table.cols.map((c,i)=>(<th key={i} className="px-3 py-2 text-left font-bold border-b">{c}</th>))}</tr></thead>
            <tbody>{data.table.rows.map((r,i)=>(
              <tr key={i} className={i%2===0?'bg-white':'bg-gray-50/40'}>
                <td className="px-3 py-2 font-medium border-b align-top whitespace-nowrap">{r[0]}</td>
                <td className="px-3 py-2 border-b align-top whitespace-pre-line">{r[1]}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    );
    if(data.type==='report')return (
      <div>
        <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-3 mb-3">
          <div className="flex items-center space-x-1.5 mb-2"><CheckCircle size={14} className="text-emerald-600"/><div className="font-bold text-sm">{data.title}</div></div>
          <div className="space-y-1.5">
            {data.steps.map((s,i)=>(
              <div key={i} className="flex items-start space-x-2">
                <CheckCircle size={14} className="text-emerald-500 shrink-0 mt-0.5"/>
                <div><div className="text-[13px] font-medium">{s.label}</div><div className="text-[11px] text-gray-500">{s.sub}</div></div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white border rounded-lg p-4 text-[13px] mb-3 font-mono">{renderMarkdown(data.preview)}</div>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <div className="w-12 h-16 rounded bg-white border flex flex-col items-center justify-center shrink-0 shadow-sm"><FileText size={20} className="text-blue-600"/><span className="text-[8px] font-bold text-blue-600 mt-1">PDF</span></div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] text-blue-700 font-bold">한국가스기술공사</div>
              <div className="font-bold text-sm mt-0.5">{data.docTitle}</div>
              <div className="text-[11px] text-gray-500 mt-0.5">{data.docSubtitle}</div>
              <div className="flex space-x-2 mt-3">
                <button onClick={()=>toast('문서 미리보기를 엽니다','info')} className="px-3 py-1.5 border border-blue-300 text-blue-700 rounded-lg text-xs font-bold flex items-center hover:bg-blue-50"><Eye size={12} className="mr-1"/>문서 미리보기</button>
                <button onClick={()=>toast('보고서가 다운로드됩니다')} className="px-3 py-1.5 bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center hover:bg-emerald-600"><Download size={12} className="mr-1"/>다운로드</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    return null;
  };

  const renderHighlighted=(text,highlights)=>{
    if(!highlights||!highlights.length)return text;
    let result=text;
    return text.split('\n').map((line,i)=>{
      let parts=[line];
      highlights.forEach(h=>{
        parts=parts.flatMap(p=>typeof p==='string'?p.split(h).flatMap((seg,j,arr)=>j<arr.length-1?[seg,{hl:h}]:[seg]):[p]);
      });
      return <div key={i} className="whitespace-pre-wrap">{parts.map((p,j)=>typeof p==='string'?<span key={j}>{p}</span>:<mark key={j} className="bg-yellow-200 text-gray-900 font-bold px-0.5 rounded">{p.hl}</mark>)}</div>;
    });
  };

  return (
    <div className="flex h-screen bg-[#F5F6F8] text-gray-800" style={{fontFamily:'"NanumSquareNeo","Pretendard",-apple-system,BlinkMacSystemFont,"Malgun Gothic",sans-serif'}}>
      {/* === LEFT SIDEBAR === */}
      <aside className="w-64 bg-white border-r flex flex-col shrink-0">
        {/* Logo */}
        <div className="px-4 py-3.5 border-b flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 via-indigo-600 to-blue-700 rounded-xl flex items-center justify-center text-white font-bold text-xs shadow-md">AT</div>
            <div>
              <div className="text-[15px] font-extrabold tracking-tight leading-none">AI TOM</div>
              <div className="text-[9px] text-gray-500 font-medium mt-0.5">사용자 모드</div>
            </div>
          </div>
        </div>
        {/* Tabs */}
        <div className="px-3 pt-3 pb-2">
          <div className="flex bg-gray-100 rounded-lg p-0.5">
            {[['general','일반'],['agent','에이전트']].map(([k,l])=>(
              <button key={k} onClick={()=>setTab(k)} className={`flex-1 px-2 py-1.5 rounded-md text-xs font-bold transition-all ${tab===k?'bg-white shadow-sm text-blue-700':'text-gray-500 hover:text-gray-700'}`}>{l}</button>
            ))}
          </div>
        </div>
        {/* Search + new */}
        <div className="px-3 pb-2 space-y-2">
          <div className="relative">
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="검색" className="w-full pl-7 pr-2 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white"/>
            <Search size={11} className="absolute left-2 top-2 text-gray-400"/>
          </div>
          <button onClick={newConv} className="w-full py-1.5 border-2 border-dashed border-gray-300 text-gray-500 hover:border-blue-400 hover:text-blue-600 rounded-lg text-xs font-bold flex items-center justify-center"><Plus size={12} className="mr-1"/>새로 시작</button>
        </div>

        {/* Tab content */}
        {tab==='general' ? (
          <div className="flex-1 overflow-y-auto custom-scrollbar px-2 pb-1">
            {pinnedConvs.length>0 && <>
              <div className="px-2 pt-2 pb-1 text-[10px] font-bold text-gray-400 uppercase tracking-wide flex items-center"><Pin size={9} className="mr-1"/>고정</div>
              {pinnedConvs.map(c=>(
                <ConvItem key={c.id} conv={c} active={activeConvId===c.id} onClick={()=>loadConv(c)} onPin={togglePin} onDel={delConv}/>
              ))}
            </>}
            {todayConvs.length>0 && <>
              <div className="px-2 pt-3 pb-1 text-[10px] font-bold text-gray-400 uppercase tracking-wide">오늘</div>
              {todayConvs.map(c=><ConvItem key={c.id} conv={c} active={activeConvId===c.id} onClick={()=>loadConv(c)} onPin={togglePin} onDel={delConv}/>)}
            </>}
            {weekConvs.length>0 && <>
              <div className="px-2 pt-3 pb-1 text-[10px] font-bold text-gray-400 uppercase tracking-wide">최근 7일</div>
              {weekConvs.map(c=><ConvItem key={c.id} conv={c} active={activeConvId===c.id} onClick={()=>loadConv(c)} onPin={togglePin} onDel={delConv}/>)}
            </>}
            {oldConvs.length>0 && <>
              <div className="px-2 pt-3 pb-1 text-[10px] font-bold text-gray-400 uppercase tracking-wide">이전</div>
              {oldConvs.map(c=><ConvItem key={c.id} conv={c} active={activeConvId===c.id} onClick={()=>loadConv(c)} onPin={togglePin} onDel={delConv}/>)}
            </>}
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto custom-scrollbar px-2 pb-1">
            <div className="px-2 pt-2 pb-1 text-[10px] font-bold text-gray-400 uppercase tracking-wide">전문 에이전트</div>
            {TOM_AGENTS.map(a=>(
              <div key={a.id} onClick={()=>{setActiveAgent(a);setTab('general');newConv();toast(`'${a.name}' 으로 전환했습니다`);}} className={`mx-1 my-0.5 px-2 py-2 rounded-lg cursor-pointer text-xs ${activeAgent.id===a.id?'bg-blue-50 ring-1 ring-blue-200':'hover:bg-gray-50'}`}>
                <div className="flex items-center space-x-2">
                  <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${a.color} flex items-center justify-center text-white shrink-0 shadow-sm`}><Bot size={13}/></div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center space-x-1"><span className="font-bold truncate">{a.name}</span>{a.badge&&<span className="bg-blue-100 text-blue-700 text-[9px] font-bold px-1 py-0.5 rounded">{a.badge}</span>}</div>
                    <div className="text-[10px] text-gray-500 line-clamp-1 mt-0.5">{a.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom shortcuts */}
        <div className="px-2 py-2 border-t space-y-0.5 text-xs text-gray-600">
          <div className="flex items-center px-2 py-1.5 hover:bg-gray-50 rounded-lg cursor-pointer"><Star size={12} className="mr-2 text-yellow-500"/>즐겨찾기</div>
          <div className="flex items-center px-2 py-1.5 hover:bg-gray-50 rounded-lg cursor-pointer"><AlertCircle size={12} className="mr-2 text-gray-400"/>FAQ</div>
        </div>

        {/* User profile */}
        <div className="px-3 py-2.5 border-t bg-gray-50/50">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-[11px] font-bold shrink-0">김</div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold truncate">김인훈 과장</div>
              <div className="text-[10px] text-gray-500 truncate">정비기술처</div>
            </div>
            <button onClick={onOpenMypage} className="p-1 text-gray-400 hover:text-gray-700 hover:bg-white rounded" title="마이페이지"><UserCog size={13}/></button>
          </div>
          <button onClick={onSwitchToAdmin} className="w-full mt-2 px-2 py-1.5 bg-gray-800 hover:bg-gray-900 text-white rounded-lg text-[11px] font-bold flex items-center justify-center"><Settings size={11} className="mr-1"/>관리자 콘솔</button>
        </div>
      </aside>

      {/* === MAIN === */}
      <main className="flex-1 flex flex-col min-w-0 bg-white">
        {/* Header */}
        <header className="px-7 py-3.5 border-b shrink-0 bg-white">
          <div className="flex items-center space-x-2 mb-0.5">
            <div className={`w-6 h-6 rounded-md bg-gradient-to-br ${activeAgent.color} flex items-center justify-center text-white`}><Bot size={12}/></div>
            <h1 className="font-bold text-base">{activeAgent.name}</h1>
          </div>
          <p className="text-xs text-gray-500 ml-8">{activeAgent.desc}</p>
        </header>

        {/* Messages / Empty state */}
        <div className="flex-1 overflow-y-auto bg-[#FAFBFC]">
          {messages.length===0 ? (
            <div className="h-full flex flex-col items-center justify-center px-8 py-10">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-blue-600 flex items-center justify-center text-white mb-4 shadow-lg">
                <Sparkles size={22}/>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">안녕하세요, 사용자님</h2>
              <p className="text-sm text-gray-500 mb-8">사내 규정 조회, 기술 매뉴얼 등 업무 자유롭게 지원합니다.</p>
              <div className="grid grid-cols-2 gap-3 w-full max-w-2xl">
                {TOM_GENERAL_PROMPTS.map((p,i)=>(
                  <div key={i} onClick={()=>generate(p.q)} className="bg-white rounded-2xl border p-4 hover:border-blue-400 hover:shadow-md cursor-pointer transition-all group">
                    <div className="flex items-start space-x-2.5">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 group-hover:bg-blue-100 transition-colors"><p.icon size={16}/></div>
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-sm mb-1">{p.t}</div>
                        <div className="text-[11px] text-gray-500 leading-relaxed line-clamp-2">{p.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto py-6 px-8 space-y-5">
              {messages.map((m,i)=>(
                <div key={i} className={`flex ${m.role==='user'?'justify-end':'justify-start'}`}>
                  {m.role==='assistant' && (
                    <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${activeAgent.color} flex items-center justify-center text-white mr-3 mt-1 shrink-0`}><Bot size={13}/></div>
                  )}
                  {m.role==='user' ? (
                    <div className="max-w-[75%] bg-blue-600 text-white rounded-2xl rounded-tr-md px-4 py-2.5 shadow-sm">
                      <div className="text-sm whitespace-pre-wrap leading-relaxed">{m.content}</div>
                    </div>
                  ) : (
                    <div className="flex-1 max-w-[85%]">
                      <div className="bg-white border rounded-2xl rounded-tl-md px-5 py-4 shadow-sm">
                        {renderAssistant(m.data)}
                      </div>
                      <div className="flex items-center mt-1.5 px-1 space-x-0.5">
                        <button onClick={()=>{navigator.clipboard?.writeText(JSON.stringify(m.data));toast('복사되었습니다');}} className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded"><Copy size={11}/></button>
                        <button onClick={()=>toast('좋은 답변으로 평가했습니다')} className="p-1 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded"><ThumbsUp size={11}/></button>
                        <button onClick={()=>toast('피드백이 접수되었습니다','info')} className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"><ThumbsDown size={11}/></button>
                        <button onClick={()=>toast('재생성 중...','info')} className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded"><RotateCcw size={11}/></button>
                        <button onClick={()=>toast('음성 재생','info')} className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded"><Volume2 size={11}/></button>
                        <span className="text-[10px] text-gray-400 ml-auto">{m.time}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {sending && (
                <div className="flex items-start">
                  <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${activeAgent.color} flex items-center justify-center text-white mr-3 mt-1 shrink-0`}><Bot size={13}/></div>
                  <div className="bg-white border rounded-2xl px-4 py-3 shadow-sm">
                    <div className="flex items-center space-x-1.5">
                      <span className="text-[11px] text-gray-500">답변 작성 중</span>
                      <div className="flex space-x-1">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay:'0s'}}/>
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay:'0.2s'}}/>
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay:'0.4s'}}/>
                      </div>
                      <button onClick={()=>setSending(false)} className="ml-2 text-[10px] text-red-500 hover:underline">중지</button>
                    </div>
                  </div>
                </div>
              )}
              <div ref={endRef}/>
            </div>
          )}
        </div>

        {/* Input bar */}
        <div className="border-t bg-white px-6 py-3 shrink-0">
          <div className="max-w-4xl mx-auto">
            <div className="border-2 border-gray-200 rounded-2xl bg-white p-2.5 focus-within:border-blue-400 transition-colors">
              <textarea value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.nativeEvent.isComposing){e.preventDefault();send();}}} rows={1} placeholder="메시지를 입력하세요..." className="w-full px-2 py-1.5 text-sm outline-none resize-none max-h-32 placeholder:text-gray-400"/>
              <div className="flex items-center justify-between mt-1">
                <div className="flex items-center space-x-1">
                  <button onClick={()=>toast('파일 첨부 (데모)','info')} className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg" title="파일 첨부"><Paperclip size={15}/></button>
                  <button onClick={()=>toast('음성 입력 (데모)','info')} className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg" title="음성 입력"><Mic size={15}/></button>
                </div>
                <div className="flex items-center space-x-1.5">
                  <button onClick={()=>setTools(p=>({...p,rag:!p.rag}))} className={`flex items-center space-x-1 px-2 py-1 rounded-lg text-[11px] font-bold transition-colors ${tools.rag?'bg-blue-50 text-blue-700 ring-1 ring-blue-300':'bg-gray-50 text-gray-500 hover:bg-gray-100'}`} title="RAG (사내 문서 참조)"><BookOpen size={10}/><span>RAG</span></button>
                  <button onClick={()=>setTools(p=>({...p,smartAuto:!p.smartAuto}))} className={`flex items-center space-x-1 px-2 py-1 rounded-lg text-[11px] font-bold transition-colors ${tools.smartAuto?'bg-purple-50 text-purple-700 ring-1 ring-purple-300':'bg-gray-50 text-gray-500 hover:bg-gray-100'}`} title="자동으로 적합한 도구 선택"><Sparkles size={10}/><span>Smart Auto</span></button>
                  <div className="relative">
                    <button onClick={()=>setShowModelMenu(v=>!v)} className="flex items-center space-x-1 px-2 py-1 rounded-lg text-[11px] font-bold bg-gray-50 text-gray-700 hover:bg-gray-100">
                      <Cpu size={10}/><span>{model}</span><ChevronDown size={10}/>
                    </button>
                    {showModelMenu && (
                      <div className="absolute bottom-full right-0 mb-1 bg-white border rounded-lg shadow-xl min-w-[140px] z-10">
                        {['GPT-OSS','GPT-4o','Llama-3-Kor','EXAONE-3.0'].map(m=>(
                          <div key={m} onClick={()=>{setModel(m);setShowModelMenu(false);}} className="px-3 py-1.5 hover:bg-gray-50 cursor-pointer text-xs flex items-center justify-between">{m}{model===m&&<Check size={10} className="text-blue-600"/>}</div>
                        ))}
                      </div>
                    )}
                  </div>
                  <button onClick={send} disabled={!input.trim()||sending} className={`p-2 rounded-xl transition-colors ${input.trim()&&!sending?'bg-blue-600 text-white hover:bg-blue-700':'bg-gray-100 text-gray-300'}`}>
                    <ArrowUp size={15}/>
                  </button>
                </div>
              </div>
            </div>
            <p className="text-[10px] text-gray-400 text-center mt-2">AI 답변에는 실수가 있을 수 있으니, 답변에 사용된 출처를 확인해 주세요.</p>
          </div>
        </div>
      </main>

      {/* === RIGHT SIDEBAR (참조 자료) === */}
      {showRefs && (
        <aside className="w-72 bg-white border-l flex flex-col shrink-0">
          <div className="px-4 py-3.5 border-b flex items-center justify-between">
            <h3 className="font-bold text-sm flex items-center"><BookOpen size={13} className="mr-1.5 text-blue-600"/>참조 자료</h3>
            <button onClick={()=>setShowRefs(false)} className="p-1 text-gray-400 hover:bg-gray-100 rounded"><X size={14}/></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {currentSources.length===0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 py-12">
                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-3"><FileText size={22} className="text-gray-300"/></div>
                <div className="text-xs">참조 자료가 없습니다</div>
                <div className="text-[10px] text-gray-300 mt-1">RAG를 켜고 질문하면 출처가 표시됩니다</div>
              </div>
            ) : (
              <div className="space-y-3">
                {currentSources.map((s,i)=>(
                  <div key={i} className="border rounded-xl overflow-hidden">
                    <div className="px-3 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
                      <div className="flex items-center space-x-1.5 mb-1">
                        <FileText size={12} className="text-blue-600 shrink-0"/>
                        <span className="text-[11px] font-bold truncate">{s.doc}</span>
                      </div>
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-gray-500">p.{s.page}</span>
                        <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold">유사도 {s.similarity}%</span>
                      </div>
                    </div>
                    <div className="p-3 text-[11px] text-gray-700 leading-relaxed bg-gray-50/60 max-h-72 overflow-y-auto custom-scrollbar">
                      {renderHighlighted(s.excerpt,s.highlights)}
                    </div>
                    <div className="px-3 py-2 border-t bg-white flex items-center space-x-2">
                      <button onClick={()=>toast('문서 미리보기를 엽니다','info')} className="text-[10px] text-blue-600 hover:underline flex items-center"><Eye size={10} className="mr-0.5"/>미리보기</button>
                      <span className="text-gray-300">·</span>
                      <button onClick={()=>toast('다운로드합니다')} className="text-[10px] text-blue-600 hover:underline flex items-center"><Download size={10} className="mr-0.5"/>다운로드</button>
                      <span className="ml-auto text-[9px] text-gray-400">원본 열기</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>
      )}

      {/* Reopen refs button when collapsed */}
      {!showRefs && (
        <button onClick={()=>setShowRefs(true)} className="absolute right-0 top-1/2 -translate-y-1/2 bg-white border border-r-0 rounded-l-lg px-1 py-3 shadow-md hover:bg-gray-50" title="참조 자료 열기">
          <BookOpen size={14} className="text-gray-500"/>
        </button>
      )}
    </div>
  );
};

const ConvItem = ({conv,active,onClick,onPin,onDel}) => (
  <div onClick={onClick} className={`group mx-1 my-0.5 px-2 py-1.5 rounded-lg cursor-pointer text-xs transition-colors ${active?'bg-blue-50 text-blue-700 font-medium':'hover:bg-gray-50 text-gray-700'}`}>
    <div className="flex items-center">
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-1">
          {conv.pinned&&<Pin size={9} className="text-blue-500 shrink-0"/>}
          <span className="truncate">{conv.title}</span>
        </div>
      </div>
      <div className="hidden group-hover:flex items-center space-x-0.5 ml-1">
        <button onClick={e=>{e.stopPropagation();onPin(conv.id);}} className="p-0.5 text-gray-400 hover:text-blue-600" title={conv.pinned?'고정 해제':'고정'}><Pin size={10}/></button>
        <button onClick={e=>{e.stopPropagation();onDel(conv.id);}} className="p-0.5 text-gray-400 hover:text-red-600" title="삭제"><Trash2 size={10}/></button>
      </div>
    </div>
  </div>
);

// ==================== SIDEBAR ====================
const SidebarItem = ({item,activeId,onNav,level=0}) => {
  const isActive = activeId===item.id;
  const isParentActive = activeId?.startsWith(item.id+'.');
  const hasChildren = !!item.children;
  const [expanded,setExpanded]=useState(isActive||isParentActive);
  useEffect(()=>{if(isActive||isParentActive) setExpanded(true);},[activeId,item.id]);

  const pl = level===0?'pl-4':level===1?'pl-9':level===2?'pl-12':'pl-14';

  const handleClick = ()=>{
    if(hasChildren){setExpanded(!expanded);} else {onNav(item.id);}
  };

  return (<>
    <div onClick={handleClick} className={`flex items-center justify-between py-2 pr-3 mx-2 rounded-lg cursor-pointer text-sm transition-all select-none ${pl} ${!hasChildren&&isActive?'bg-blue-50 text-blue-700 font-bold border-l-[3px] border-blue-600':'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
      <div className="flex items-center space-x-2.5 min-w-0">
        {level===0&&item.icon&&<item.icon size={18} className={!hasChildren&&isActive?'text-blue-600':'text-gray-400'}/>}
        {level>0&&<span className={`w-1.5 h-1.5 rounded-full ${!hasChildren&&isActive?'bg-blue-600':'bg-gray-300'}`}/>}
        <span className="truncate">{item.label}</span>
      </div>
      {hasChildren&&<ChevronDown size={14} className={`text-gray-400 transition-transform ${expanded?'rotate-180':''}`}/>}
    </div>
    {hasChildren&&expanded&&<div className="mt-0.5">{item.children.map(c=><SidebarItem key={c.id} item={c} activeId={activeId} onNav={onNav} level={level+1}/>)}</div>}
  </>);
};

// ==================== MAIN APP ====================
const App = () => {
  const [viewMode,setViewMode]=useState('service'); // 'service' | 'admin'
  const [activeId,setActiveId]=useState('svc.home');
  const [adminActiveId,setAdminActiveId]=useState('dashboard.system');
  const [chatSeed,setChatSeed]=useState({prompt:'',agent:null});

  const startChat=(prompt='',agent=null)=>{
    setChatSeed({prompt,agent});
    setActiveId('svc.chat');
  };

  const serviceMenu=[
    {id:'svc.home',label:'홈',icon:Home},
    {id:'svc.chat',label:'AI 채팅',icon:MessageSquare,highlight:true},
    {id:'svc.agents',label:'에이전트 스토어',icon:Bot},
    {id:'svc.knowledge',label:'내 지식 영역',icon:FolderTree},
    {id:'_sd1',label:'생산성',section:true},
    {id:'svc.report',label:'보고서 작성',icon:FileText},
    {id:'svc.analysis',label:'데이터 분석',icon:BarChart3},
    {id:'svc.image',label:'이미지 생성',icon:ImageIcon},
    {id:'svc.tools',label:'간편 도구',icon:Wand2},
    {id:'_sd2',label:'기록',section:true},
    {id:'svc.history',label:'대화 기록',icon:History},
    {id:'user.page',label:'마이페이지',icon:UserCog},
  ];

  const adminMenu = [
    {id:'dashboard',label:'대시보드',icon:LayoutDashboard,children:[
      {id:'dashboard.system',label:'시스템'},{id:'dashboard.service',label:'서비스'},{id:'dashboard.gpu',label:'GPU'},{id:'dashboard.trainer',label:'트레이너'}
    ]},
    {id:'_s1',label:'개발',section:true},
    {id:'data',label:'데이터',icon:Database,children:[
      {id:'data.dataset',label:'데이터셋'},{id:'data.vectordb',label:'벡터 DB'},{id:'data.autoload',label:'자동 적재'}
    ]},
    {id:'dev',label:'개발',icon:Code,children:[
      {id:'dev.codespace',label:'코드스페이스'},{id:'dev.volume',label:'공유 볼륨'}
    ]},
    {id:'model.registry',label:'모델',icon:Box},
    {id:'trainer',label:'트레이너',icon:Layers,children:[
      {id:'trainer.llm',label:'LLM'},{id:'trainer.vlm',label:'VLM'},{id:'trainer.embedding',label:'임베딩'},{id:'trainer.reranking',label:'리랭킹'}
    ]},
    {id:'eval',label:'평가',icon:BarChart2,children:[
      {id:'eval.leaderboard',label:'리더보드'},{id:'eval.metrics',label:'평가지표'}
    ]},
    {id:'guardrail',label:'가드레일',icon:Shield,children:[
      {id:'guardrail.filter',label:'필터 설정'},{id:'guardrail.log',label:'탐지 로그'}
    ]},
    {id:'_s2',label:'배포',section:true},
    {id:'deploy.tools',label:'도구',icon:Wrench,children:[
      {id:'deploy.tools.mcp',label:'MCP 도구'},{id:'deploy.tools.server',label:'MCP 서버'},{id:'deploy.tools.prompt',label:'프롬프트 라이브러리'}
    ]},
    {id:'deploy.serving',label:'서빙',icon:Cloud},
    {id:'_s3',label:'서비스',section:true},
    {id:'agent',label:'에이전트',icon:Bot,children:[
      {id:'agent.taskflow',label:'태스크플로우',children:[
        {id:'agent.taskflow.builder',label:'빌더'},{id:'agent.taskflow.deploy',label:'배포'}
      ]},
      {id:'agent.workflow',label:'워크플로우'}
    ]},
    {id:'app',label:'애플리케이션',icon:Grid,children:[
      {id:'app.chat',label:'채팅'},{id:'app.report',label:'보고서 생성'},{id:'app.analysis',label:'데이터 분석'}
    ]},
    {id:'_s4',label:'운영',section:true},
    {id:'ops.approval',label:'승인',icon:CheckSquare},
    {id:'ops.quota',label:'할당량',icon:Clock},
    {id:'_s5',label:'관리자 전용',section:true},
    {id:'admin',label:'관리',icon:Settings,children:[
      {id:'admin.manage',label:'관리 홈'},
      {id:'admin.users',label:'사용자 관리'},
      {id:'admin.knowledge',label:'지식영역 관리'},
      {id:'admin.stats',label:'이용 통계'},
      {id:'admin.logs',label:'접근 로그'},
      {id:'admin.quality',label:'AI 품질 관리'},
      {id:'admin.announce',label:'공지사항'},
      {id:'admin.monitor',label:'시스템 모니터링'},
      {id:'admin.security',label:'보안 설정'},
      {id:'admin.system',label:'시스템 설정'},
    ]},
  ];

  const adminPages = {
    'dashboard.system':<SystemDashboard/>,'dashboard.service':<ServiceDashboard/>,'dashboard.gpu':<GpuDashboard/>,'dashboard.trainer':<DashboardTrainer/>,
    'data.dataset':<DatasetPage/>,'data.vectordb':<VectorDbPage/>,'data.autoload':<AutoLoadPage/>,
    'dev.codespace':<CodespacePage/>,'dev.volume':<SharedVolumePage/>,
    'model.registry':<ModelRegistry/>,
    'trainer.llm':<LlmTraining/>,'trainer.vlm':<VlmTraining/>,'trainer.embedding':<EmbeddingPage/>,'trainer.reranking':<RerankingPage/>,
    'eval.leaderboard':<LeaderboardPage/>,'eval.metrics':<EvalMetricsPage/>,
    'guardrail.filter':<GuardrailFilterPage/>,'guardrail.log':<GuardrailLogPage/>,
    'deploy.tools.mcp':<MCPToolsPage/>,'deploy.tools.server':<MCPServerPage/>,'deploy.tools.prompt':<PromptLibraryPage/>,
    'deploy.serving':<ServingPage/>,
    'agent.taskflow.builder':<TaskflowBuilderPage/>,'agent.taskflow.deploy':<TaskflowDeployPage/>,'agent.workflow':<WorkflowPage/>,
    'app.chat':<ChatAppPage/>,'app.report':<ReportGenPage/>,'app.analysis':<DataAnalysisPage/>,
    'ops.approval':<ApprovalPage/>,'ops.quota':<QuotaPage/>,
    'admin.manage':<AdminPage/>,'admin.users':<UserManagementPage/>,'admin.knowledge':<KnowledgeManagementPage/>,
    'admin.stats':<UsageStatsPage/>,'admin.logs':<AccessLogPage/>,'admin.quality':<QualityManagementPage/>,
    'admin.announce':<AnnouncementPage/>,'admin.monitor':<SystemMonitorPage/>,
    'admin.security':<SecuritySettingsPage/>,'admin.system':<SystemSettingsPage/>,
    'user.page':<UserPage/>,
  };

  const servicePages = {
    'svc.home':<ServiceHome onNav={setActiveId} onStartChat={startChat}/>,
    'svc.chat':<ServiceChat initialPrompt={chatSeed.prompt} initialAgent={chatSeed.agent}/>,
    'svc.agents':<ServiceAgentStore onStartChat={startChat}/>,
    'svc.knowledge':<ServiceMyKnowledge onStartChat={startChat}/>,
    'svc.report':<ServiceReportWriter/>,
    'svc.analysis':<ServiceDataAnalysis/>,
    'svc.image':<ServiceImageGen/>,
    'svc.tools':<ServiceQuickTools/>,
    'svc.history':<ServiceHistory onOpenChat={()=>setActiveId('svc.chat')}/>,
    'user.page':<UserPage/>,
  };

  const isService=viewMode==='service';
  const currentMenu=isService?serviceMenu:adminMenu;
  const currentPages=isService?servicePages:adminPages;
  const currentActiveId=isService?activeId:adminActiveId;
  const currentSetActiveId=isService?setActiveId:setAdminActiveId;

  const switchMode=()=>{
    if(isService){
      setViewMode('admin');
    } else {
      setViewMode('service');
    }
  };

  const [showMypage,setShowMypage]=useState(false);

  if (isService) {
    return (
      <ToastProvider>
        <div style={{fontFamily:'"NanumSquareNeo","Pretendard",-apple-system,BlinkMacSystemFont,"Malgun Gothic",sans-serif'}}>
          <AITomChat onSwitchToAdmin={()=>setViewMode('admin')} onOpenMypage={()=>setShowMypage(true)}/>
          <Modal isOpen={showMypage} onClose={()=>setShowMypage(false)} title="마이페이지" size="xl">
            <div className="-m-6"><UserPage/></div>
          </Modal>
        </div>
      </ToastProvider>
    );
  }

  return (
    <ToastProvider>
    <div className="flex h-screen bg-gray-50 text-gray-800" style={{fontFamily:'"NanumSquareNeo","Pretendard",-apple-system,BlinkMacSystemFont,"Malgun Gothic",sans-serif'}}>
      {/* Sidebar */}
      <div className="w-60 bg-white flex flex-col h-full border-r shrink-0">
        <div className="p-5 pb-4 flex items-center justify-between border-b">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-sm bg-gradient-to-br from-blue-600 to-indigo-600">G</div>
            <div>
              <div className="text-base font-extrabold tracking-tight leading-none">GenOS</div>
              <div className="text-[9px] text-gray-400 font-medium mt-0.5">관리자 콘솔</div>
            </div>
          </div>
        </div>
        <div className="flex-1 py-2 overflow-y-auto text-sm custom-scrollbar" style={{scrollbarWidth:'thin'}}>
          {adminMenu.map(item=>
            item.section ? <div key={item.id} className="px-5 pt-5 pb-1.5 text-[11px] font-bold text-gray-400 tracking-wider">{item.label}</div>
            : <SidebarItem key={item.id} item={item} activeId={adminActiveId} onNav={setAdminActiveId}/>
          )}
        </div>
        <div className="border-t">
          <div onClick={()=>setAdminActiveId('user.page')} className={`mx-2 my-2 flex items-center space-x-2 px-3 py-2 rounded-lg cursor-pointer text-sm transition-all ${adminActiveId==='user.page'?'bg-blue-50 text-blue-700 font-bold border-l-[3px] border-blue-600':'hover:bg-gray-50 text-gray-600'}`}>
            <Monitor size={16} className={adminActiveId==='user.page'?'text-blue-600':'text-gray-400'}/><span>사용자 페이지</span>
          </div>
        </div>
        <div className="p-3 border-t">
          <div className="flex items-center space-x-2.5 p-2 rounded-lg hover:bg-gray-50 cursor-pointer mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white text-xs font-bold shadow-sm">김</div>
            <div className="flex-1 min-w-0"><div className="text-sm font-bold truncate">김영빈·관리자</div><div className="text-xs text-gray-400 truncate">한국가스기술공사</div></div>
          </div>
          <button onClick={()=>setViewMode('service')} className="w-full px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-center transition-all border-2 border-blue-500 text-blue-600 hover:bg-blue-50">
            <ArrowLeft size={12} className="mr-1.5"/>AI TOM 으로 돌아가기
          </button>
        </div>
      </div>

      {/* Main */}
      <main className="flex-1 overflow-hidden flex flex-col">
        <div className="h-14 bg-white border-b shadow-sm flex items-center justify-between px-6 shrink-0">
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-700 border">⚙️ 관리자 콘솔</span>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"><Columns size={18}/></button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"><Settings size={18}/></button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg relative"><Bell size={18}/><span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"/></button>
            <div className="flex items-center space-x-2 ml-3 pl-3 border-l text-sm font-medium text-gray-700 cursor-pointer hover:text-gray-900">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white text-[10px] font-bold">김</div>
              <span>김영빈</span><ChevronDown size={14}/>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-hidden bg-[#F8F9FA]">
          {adminPages[adminActiveId] || (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <Briefcase size={48} className="mb-4 text-gray-300"/><h3 className="text-lg font-medium">준비 중인 페이지입니다</h3><p className="text-sm mt-1 font-mono bg-gray-100 px-3 py-1 rounded">{adminActiveId}</p>
            </div>
          )}
        </div>
      </main>
    </div>
    </ToastProvider>
  );
};

export default App;
