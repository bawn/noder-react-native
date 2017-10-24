//
//  LCHtmlNode.m
//  Noder
//
//  Created by bawn on 07/04/2017.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "LCHtmlNode.h"
#import <HTMLKit/HTMLKit.h>
#import "NSMutableAttributedString+LCLineSpace.h"
#import "LCPTextNode.h"
#import "LCLiTextNode.h"
#import "LCNetworkImageNode.h"
#import "EXTScope.h"
#import "LCQuoteDisplayNode.h"
#import "LCHTextNode.h"
#import "LCULDisplayNode.h"
#import "LCPDisplayNode.h"
#import "LCCodeDisplayNode.h"


static CGFloat const kBottomSpaceValue = 20.0f;
static CGFloat const kTopSpaceValue = 4.0f;

@interface LCHtmlNode ()<ASTextNodeDelegate, ASNetworkImageNodeDelegate>

@property (nonatomic, strong) NSMutableArray<ASDisplayNode *> *nodeArray;
@property (nonatomic, strong) ASDisplayNode *contentView;
@property (nonatomic, assign) NSInteger number;

@end

@implementation LCHtmlNode


- (instancetype)init{
  self = [super init];
  if (self) {
    self.nodeArray = [NSMutableArray array];
    ASDisplayNode *contentView = [[ASDisplayNode alloc] init];
    self.contentView = contentView;
    [self addSubnode:contentView];
    
  }
  return self;
}

- (void)setNodes:(NSOrderedSet *)nodes{
  _nodes = nodes;
  
//  [self.contentView.subnodes makeObjectsPerformSelector:@selector(removeFromSupernode)];
  [self.contentView clearContents];
  [self.nodeArray removeAllObjects];
  
  [nodes enumerateObjectsUsingBlock:^(HTMLElement * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
    //            NSLog(@"%@", obj.name);
    if (obj.childNodesCount != 0) {
      NSString *name = obj.name;
      if ([name isEqualToString:@"p"]) {
        LCPDisplayNode *node = [[LCPDisplayNode alloc] initWithContent:obj delegate:self];
        [self.nodeArray addObject:node];
        [self.contentView addSubnode:node];
      }
      else if ([name isEqualToString:@"h1"]){
        LCHTextNode *node = [[LCHTextNode alloc] init];
        node.attributedText = [NSMutableAttributedString attributedWithH1String:obj.textContent];
        [self.nodeArray addObject:node];
        [self.contentView addSubnode:node];
      }
      else if ([name isEqualToString:@"h2"]){
        LCHTextNode *node = [[LCHTextNode alloc] init];
        node.attributedText = [NSMutableAttributedString attributedWithH2String:obj.textContent];
        [self.nodeArray addObject:node];
        [self.contentView addSubnode:node];
      }
      else if ([name isEqualToString:@"h3"]){
        LCHTextNode *node = [[LCHTextNode alloc] init];
        node.attributedText = [NSMutableAttributedString attributedWithH3String:obj.textContent];
        [self.nodeArray addObject:node];
        [self.contentView addSubnode:node];
      }
      // 列表
      else if ([name isEqualToString:@"ul"] || [name isEqualToString:@"ol"]){
        LCULDisplayNode *node = [[LCULDisplayNode alloc] initWithContent:obj delegate:self];
        [self.nodeArray addObject:node];
        [self.contentView addSubnode:node];
      }
      // 代码块
      else if ([name isEqualToString:@"pre"]){
        LCCodeDisplayNode *node = [[LCCodeDisplayNode alloc] initWithContent:obj];
        [self.nodeArray addObject:node];
        [self.contentView addSubnode:node];
      }
      // 引用
      else if ([name isEqualToString:@"blockquote"]){
        LCQuoteDisplayNode *node = [[LCQuoteDisplayNode alloc] initWithContent:obj delegate:self];
        [self.nodeArray addObject:node];
        [self.contentView addSubnode:node];
      }
    }
  }];
  
  @weakify(self);
  NSMutableArray *layoutArray = [NSMutableArray arrayWithCapacity:self.nodeArray.count];
  [self.contentView setLayoutSpecBlock:^ASLayoutSpec*(__kindof ASDisplayNode * _Nonnull node, ASSizeRange constrainedSize) {
    @strongify(self);
    [layoutArray removeAllObjects];
    [self.nodeArray enumerateObjectsUsingBlock:^(ASDisplayNode * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
      if ([obj isKindOfClass:[LCCodeDisplayNode class]]){
        LCCodeDisplayNode *codeNode = (LCCodeDisplayNode *)obj;
        codeNode.style.spacingAfter = kBottomSpaceValue;
        [layoutArray addObject:codeNode];
      }
      else if ([obj isKindOfClass:[LCHTextNode class]]){
        LCHTextNode *textNode = (LCHTextNode *)obj;
        textNode.style.spacingBefore = kTopSpaceValue;
        textNode.style.spacingAfter = kBottomSpaceValue;
        [layoutArray addObject:textNode];
      }
      else{
        [layoutArray addObject:obj];
      }
    }];
    ASStackLayoutSpec *layout = [ASStackLayoutSpec verticalStackLayoutSpec];
    layout.justifyContent = ASStackLayoutJustifyContentStart;
    layout.alignItems = ASStackLayoutAlignItemsStretch;
    layout.children = layoutArray;
    
    ASInsetLayoutSpec *insetLayout = [ASInsetLayoutSpec insetLayoutSpecWithInsets:UIEdgeInsetsZero child:layout];
    
    return insetLayout;
  }];
}


- (void)layoutDidFinish{
  [super layoutDidFinish];
  self.number++;
  if (self.layoutDidFinishBlock) {
    self.layoutDidFinishBlock(self.contentView.view.bounds.size);
  }
}

- (ASLayoutSpec *)layoutSpecThatFits:(ASSizeRange)constrainedSize {
  ASStackLayoutSpec *layout = [ASStackLayoutSpec verticalStackLayoutSpec];
  layout.justifyContent = ASStackLayoutJustifyContentStart;
  layout.alignItems = ASStackLayoutAlignItemsStretch;
  layout.children = @[self.contentView];
  return layout;
}

- (void)textNode:(ASTextNode *)richTextNode tappedLinkAttribute:(NSString *)attribute value:(NSURL *)URL atPoint:(CGPoint)point textRange:(NSRange)textRange{
  NSString *urlString = URL.absoluteString;
  if ([urlString hasPrefix:@"/user/"]) {
    if (self.clickUserLinkBlock) {
      self.clickUserLinkBlock(@{
                                @"loginname" : [URL lastPathComponent],
                                });
    }
  }
  else{
    [[UIApplication sharedApplication] openURL:URL options:@{} completionHandler:NULL];
  }
}

- (BOOL)textNode:(ASTextNode *)richTextNode shouldHighlightLinkAttribute:(NSString *)attribute value:(id)value atPoint:(CGPoint)point{
  return YES;
}

@end

