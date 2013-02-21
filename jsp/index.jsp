<%@page import="com.sogou.superzone.web.util.EnvUtil"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="security" uri="http://www.springframework.org/security/tags" %>
<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8" />
<%
    boolean isDebug = EnvUtil.debug;
    long version = EnvUtil.version;
%>
<title>品牌专区</title>
<link href="../asset/css/esui-2.0.4.css?v=<%=version %>" rel="stylesheet" type="text/css" />
<link href="../asset/css/base.css?v=<%=version %>" rel="stylesheet" type="text/css" />
<link href="../asset/css/page.css?v=<%=version %>" rel="stylesheet" type="text/css" />
<link href="../asset/css/jquery-ui-1.8.17.css?v=<%=version %>" rel="stylesheet" type="text/css" />
<link href="../asset/css/uniform.aristo.css?v=<%=version %>" rel="stylesheet" type="text/css" />
</head>

<body>
<div id="Wrap">
    <div id="Head"></div>
    <div id="Nav"></div>
    <div id="Main"></div>
    <div id="Foot"></div>
</div>
<input type="hidden" id="Username" value="${sessionScope.username }" />
<script type="text/javascript">
var SUPERZONE_BASE_URL = '<%=request.getContextPath() %>';
var SOGOU_SIMPLIFIED_CHAR = '<%=com.sogou.superzone.common.word.ConvertUtils.shortWord%>';
var SOGOU_TRADITIONAL_CHAR = '<%=com.sogou.superzone.common.word.ConvertUtils.longWord%>';
var Auth = {};
<security:authorize ifAllGranted="A_AD_INFO_VIEW,A_AD_STYLE_VIEW">Auth.view = true;</security:authorize>
<security:authorize ifAllGranted="A_AD_INFO_EDIT">Auth.editInfo = true;</security:authorize>
<security:authorize ifAllGranted="A_AD_STYLE_EDIT">Auth.editStyle = true;</security:authorize>
<security:authorize ifAllGranted="A_AD_RENEWAL">Auth.renewal = true;</security:authorize>
<security:authorize ifAllGranted="A_ADMIN">Auth.role = true;</security:authorize>
</script>

<script src="<%=request.getContextPath() %>/src/sea.js"></script>
<script src="<%=request.getContextPath() %>/src/config.js?v=<%=version %><%=isDebug?"&debug=true":""%>"></script>
<script>
seajs.use('main');
</script>
</body>
</html>